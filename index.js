// Your code here

function createEmployeeRecord(array) {
    const employeeObj = {};
    employeeObj.firstName = array[0];
    employeeObj.familyName = array[1];
    employeeObj.title = array[2];
    employeeObj.payPerHour = array[3];
    employeeObj.timeInEvents = [];
    employeeObj.timeOutEvents = [];
    return employeeObj;
}

function createEmployeeRecords(array) {
    const employeesObj = [];
    for (let emp of array) {
        employeesObj.push(createEmployeeRecord(emp));
    }
    return employeesObj;
}

function createTimeInEvent(record, timeStamp) {
    const employeeRecord = record;
    const timeInEvent = {};
    timeInEvent.type = "TimeIn";
    timeInEvent.hour = Number(timeStamp.substring(11));
    timeInEvent.date = timeStamp.substring(0, 10);
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord
}

function createTimeOutEvent(record, timeStamp) {
    const employeeRecord = record;
    const timeOutEvent = {};
    timeOutEvent.type = "TimeOut";
    timeOutEvent.hour = Number(timeStamp.substring(11));
    timeOutEvent.date = timeStamp.substring(0, 10);
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord
}

function hoursWorkedOnDate(record, date) {
    const timeInEvents = record.timeInEvents;
    const timeOutEvents = record.timeOutEvents;
    const timeIn = timeInEvents.find(element => element.date === date);
    const timeOut = timeOutEvents.find(element => element.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    let wages = 0;
    for (let i = 0; i < record.timeInEvents.length; i++) {
        wages += wagesEarnedOnDate(record, record.timeInEvents[i].date)
    }
    return wages;
}

function calculatePayroll(array) {
    let totalPayroll = 0;
    for (let employee of array) {
        totalPayroll += allWagesFor(employee);
    }
    return totalPayroll;
}