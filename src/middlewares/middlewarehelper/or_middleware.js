exports.orMiddleware = (middlewares) => {
    return async (req, res, next) => {
      let middlewareIndex = 0;
      let allowed = false;
      let failResponseCode = 403
      let failureReason = ""

  
      const runNextMiddleware = async () => {
        if (middlewareIndex < middlewares.length) {
          const currentMiddleware = middlewares[middlewareIndex];
          middlewareIndex++;
          await currentMiddleware(req, res, (isMiddlewareSuccess, localfailResponseCode, localfailureReason) => {
            if(isMiddlewareSuccess){
                allowed = true; // If any middleware allows the request to proceed, set allowed to true
            }
            else if(!isMiddlewareSuccess && localfailResponseCode && localfailureReason){
                allowed = false
                failResponseCode = localfailResponseCode
                failureReason = localfailureReason
            }
          });
          if (!allowed) {
            await runNextMiddleware(); // Continue to the next middleware if access is still not granted
          }
          else{
            next()
          }
        } else {
          if (allowed) {
            next(); // Access is allowed, proceed to the next middleware or route
          } else {
            res.status(failResponseCode).send(failureReason); // None of the middlewares allowed the request, send a Forbidden response
          }
        }
      };
  
      // Start running the first middleware
      await runNextMiddleware();
    };
  };