function DateFormater(value: Date) {
    var mm = value.getMonth() + 1; // getMonth() is zero-based
    var dd = value.getDate();

    return [
      value.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("-");
  }

  export default DateFormater;