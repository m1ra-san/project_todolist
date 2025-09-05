import { getTask } from "./modify.js";
const formatDate = (d) => d.toISOString().slice(0, 10);

function datePeriods(duedate) {
  const today = new Date();
  const date = new Date(duedate);

  const todayStr=dateToday()
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

  return taskStr;
}


function dateToday(){
  const today = new Date();
  const todayStr = formatDate(today);
  
  return todayStr
}


function generateRandom(){  //  Generate and return a random number
    const num = Math.round(Math.random()*100);
    const randomNum = (Math.round((num*10)));
    return randomNum*new Date().getUTCMilliseconds();
}


export { datePeriods, dateToday,generateRandom };
