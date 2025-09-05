import { getTask } from "./modify.js";

function datePeriods(duedate) {
  const today = new Date();
  const date = new Date(duedate);
  const formatDate = (d) => d.toISOString().slice(0, 10);

  const todayStr = formatDate(today);
  const taskStr = formatDate(date);

  if (taskStr < todayStr) return "Pass due date";
  //Today
  if (taskStr === todayStr) return `Today`;

  //Tommorow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (taskStr === formatDate(tomorrow)) return "Tomorrow";

  //Week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const getDayName = (dates) => {
    return dates.toLocaleDateString("en-US", { weekday: "long" });
  };
  if (date >= startOfWeek && date <= endOfWeek) return `${getDayName(date)}`;

  return duedate;
}

export { datePeriods };
