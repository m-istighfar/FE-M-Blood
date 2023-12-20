const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "inProgress":
      return "In Progress";
    case "fulfilled":
      return "Fulfilled";
    case "expired":
      return "Expired";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

export default formatStatus;
