import { useMemo } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { PRIORITY_COLORS } from '../../constants';
import styles from './GanttChart.module.css';

const DAY_MS = 86400000;

function parseDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + 'T00:00:00');
  return isNaN(d.getTime()) ? null : d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

export function GanttChart() {
  const { state, filter } = useTaskContext();

  const allTasks = state.tasks;

  // 计算日期范围
  const { rangeStart, rangeEnd, totalDays } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let min = now;
    let max = new Date(now.getTime() + 14 * DAY_MS);

    for (const t of allTasks) {
      const sd = parseDate(t.startDate || t.dueDate);
      const ed = parseDate(t.dueDate || t.startDate);
      if (sd && sd < min) min = sd;
      if (ed && ed > max) max = ed;
    }

    const days = daysBetween(min, max);
    return { rangeStart: min, rangeEnd: max, totalDays: Math.max(days, 14) };
  }, [allTasks]);

  // 分组：有计划的和未计划的
  const { scheduled, unscheduled } = useMemo(() => {
    const sched: typeof allTasks = [];
    const unsched: typeof allTasks = [];
    for (const t of allTasks) {
      if (t.startDate || t.dueDate) {
        sched.push(t);
      } else {
        unsched.push(t);
      }
    }
    return { scheduled: sched, unscheduled: unsched };
  }, [allTasks]);

  // 筛选
  const filteredScheduled = useMemo(() => {
    return scheduled.filter((t) => {
      if (filter.status === 'active' && t.completed) return false;
      if (filter.status === 'completed' && !t.completed) return false;
      if (filter.priority !== 'all' && t.priority !== filter.priority) return false;
      if (filter.categoryId && t.categoryId !== filter.categoryId) return false;
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [scheduled, filter]);

  const filteredUnscheduled = useMemo(() => {
    return unscheduled.filter((t) => {
      if (filter.status === 'active' && t.completed) return false;
      if (filter.status === 'completed' && !t.completed) return false;
      if (filter.priority !== 'all' && t.priority !== filter.priority) return false;
      if (filter.categoryId && t.categoryId !== filter.categoryId) return false;
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [unscheduled, filter]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOffset = daysBetween(rangeStart, today);

  const colWidth = 36;
  const rowHeight = 36;
  const headerHeight = 40;
  const leftWidth = 200;

  // 生成日期标签
  const dayLabels = useMemo(() => {
    const labels: { date: number; month: number; isMonthStart: boolean; isToday: boolean }[] = [];
    for (let i = 0; i <= totalDays; i++) {
      const d = new Date(rangeStart.getTime() + i * DAY_MS);
      labels.push({
        date: d.getDate(),
        month: d.getMonth(),
        isMonthStart: d.getDate() === 1,
        isToday: i === todayOffset,
      });
    }
    return labels;
  }, [rangeStart, totalDays, todayOffset]);

  const monthMarkers = useMemo(() => {
    const markers: { label: string; offset: number }[] = [];
    let lastMonth = -1;
    for (let i = 0; i <= totalDays; i++) {
      const m = dayLabels[i].month;
      if (m !== lastMonth) {
        const d = new Date(rangeStart.getTime() + i * DAY_MS);
        markers.push({
          label: `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`,
          offset: i,
        });
        lastMonth = m;
      }
    }
    return markers;
  }, [dayLabels, rangeStart, totalDays]);

  const totalWidth = (totalDays + 1) * colWidth;

  const getBar = (task: (typeof allTasks)[0]) => {
    const sd = parseDate(task.startDate || task.dueDate);
    const ed = parseDate(task.dueDate || task.startDate);
    if (!sd || !ed) return null;

    const start = daysBetween(rangeStart, sd);
    const end = daysBetween(rangeStart, ed);
    const left = Math.max(0, start);
    const width = Math.max(2, end - start); // 至少2天宽

    return { left, width };
  };

  // 今天线位置
  const todayLineX = todayOffset >= 0 && todayOffset <= totalDays ? todayOffset * colWidth + colWidth / 2 : null;

  return (
    <div className={styles.container}>
      {scheduled.length === 0 && unscheduled.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📊</div>
          <p>添加带日期的任务后，这里会显示甘特图</p>
        </div>
      ) : (
        <div className={styles.scrollWrap}>
          <div className={styles.chart}>
            {/* 左侧任务名列 */}
            <div className={styles.leftCol} style={{ width: leftWidth }}>
              <div className={styles.headerCell} style={{ height: headerHeight }}>
                任务
              </div>
              {filteredScheduled.map((t) => (
                <div
                  key={t.id}
                  className={`${styles.taskName} ${t.completed ? styles.taskDone : ''}`}
                  style={{ height: rowHeight, borderLeftColor: PRIORITY_COLORS[t.priority].border }}
                >
                  {t.title}
                </div>
              ))}
              {filteredUnscheduled.length > 0 && (
                <div className={styles.sectionHeader} style={{ height: rowHeight }}>
                  未计划
                </div>
              )}
              {filteredUnscheduled.map((t) => (
                <div
                  key={t.id}
                  className={`${styles.taskName} ${t.completed ? styles.taskDone : ''}`}
                  style={{ height: rowHeight, borderLeftColor: PRIORITY_COLORS[t.priority].border }}
                >
                  {t.title}
                </div>
              ))}
            </div>

            {/* 右侧甘特图 */}
            <div className={styles.rightCol}>
              <div className={styles.timelineHeader} style={{ height: headerHeight }}>
                {/* 月份标记 */}
                <div className={styles.monthRow}>
                  {monthMarkers.map((m, i) => (
                    <div
                      key={i}
                      className={styles.monthLabel}
                      style={{ left: m.offset * colWidth }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>
                {/* 日期格子 */}
                <div className={styles.dayRow}>
                  {dayLabels.map((dl, i) => (
                    <div
                      key={i}
                      className={`${styles.dayCell} ${dl.isToday ? styles.dayToday : ''} ${dl.isMonthStart ? styles.dayMonthStart : ''}`}
                      style={{ width: colWidth }}
                    >
                      <span className={styles.dayNum}>{dl.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 任务条 */}
              <div className={styles.barsArea}>
                {todayLineX !== null && (
                  <div className={styles.todayLine} style={{ left: todayLineX }} />
                )}

                {filteredScheduled.map((t) => {
                  const bar = getBar(t);
                  return (
                    <div key={t.id} className={styles.barRow} style={{ height: rowHeight }}>
                      {bar && (
                        <div
                          className={`${styles.bar} ${t.completed ? styles.barDone : ''}`}
                          style={{
                            left: bar.left * colWidth + 4,
                            width: bar.width * colWidth - 8,
                            top: 6,
                            height: rowHeight - 12,
                            backgroundColor: t.completed
                              ? 'var(--color-border)'
                              : PRIORITY_COLORS[t.priority].bg,
                            borderColor: t.completed ? 'var(--color-border)' : PRIORITY_COLORS[t.priority].border,
                          }}
                          title={`${t.title} (${t.startDate || '-'} ~ ${t.dueDate || '-'})`}
                        >
                          <span className={styles.barLabel}>{t.title}</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* 未计划占位 */}
                {filteredUnscheduled.map((t) => (
                  <div key={t.id} className={styles.barRow} style={{ height: rowHeight }}>
                    <span className={styles.noDateHint}>未设置日期</span>
                  </div>
                ))}

                {/* 分隔线 */}
                {filteredUnscheduled.length > 0 && filteredScheduled.length > 0 && (
                  <div className={styles.barRow} style={{ height: rowHeight }} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
