
const validateModel = async (model, callback) => {
  const error = model.validateSync(); 

  if (error != null) {
    for (const attributename in error.errors) {
      console.log(attributename + ": " + error.errors[attributename]);
    }

    return callback(error);  
  }
};

const validateRoutes = (routers) => {
  const appStartUperror = [];
  const routesList = [];

  routers.stack.forEach((ele) => {
    if (ele.route.stack.length > 1) {
      appStartUperror.push(
        "The following path [" +
          ele.route.path +
          "] contains more than one route method"
      );
    }
    routesList.push(ele.route.path + ":" + ele.route.stack[0].method);
  });

  const set = new Set(routesList);

  const duplicates = routesList.filter((item) => {
    if (set.has(item)) {
      set.delete(item);
    } else {
      return item;
    }
  });

  if (duplicates.length != 0) {
    appStartUperror.push("duplicate routers:", duplicates);
  }

  return appStartUperror;
};

// Export the functions
export default {
  validateModel,
  validateRoutes,
};
