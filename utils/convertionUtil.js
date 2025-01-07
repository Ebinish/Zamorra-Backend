const categoryRequestToParams = (body, category = {}) => {
  for (var key in body) {
    category[key] = body[key];
  }
  return category;
};

const subcategoryRequestToParams = (body, subcategory = {}) => {
  for (var key in body) {
    subcategory[key] = body[key];
  }
  return subcategory;
};

export { categoryRequestToParams, subcategoryRequestToParams };
