/* Your Code Here */
// Function to create a single employee record
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  // Function to create a TimeIn event
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employeeRecord;
  }
  
  // Function to create a TimeOut event
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

