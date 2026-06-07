const getAppointmentPriority = (

  severity,

  emergency,

  riskLevel

) => {

  if (emergency) {

    return {

      priority: "critical",

      color: "red",

      bookingWindow:
        "Immediate",

      consultationType:
        "Emergency Care"

    };

  }

  if (

    severity === "high" ||

    riskLevel === "high"

  ) {

    return {

      priority: "high",

      color: "orange",

      bookingWindow:
        "Within 24 hours",

      consultationType:
        "Priority Consultation"

    };

  }

  if (
    severity === "medium"
  ) {

    return {

      priority: "medium",

      color: "yellow",

      bookingWindow:
        "Within 2-3 days",

      consultationType:
        "Standard Consultation"

    };

  }

  return {

    priority: "low",

    color: "green",

    bookingWindow:
      "Flexible",

    consultationType:
      "Routine Checkup"

  };

};

module.exports = {
  getAppointmentPriority
};