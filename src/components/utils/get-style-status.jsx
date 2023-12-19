const getStyleForStatus = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow";
    case "In Progress":
      return "text-blue500";
    case "Fulfilled":
      return "text-green500";
    case "Expired":
      return "text-gray500";
    case "Cancelled":
      return "text-red500";
    default:
      return "";
  }
};

export default getStyleForStatus;
