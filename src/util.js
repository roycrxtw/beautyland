
/**
 * Don't forget to use arrow function when you are calling this helper function.
 * @param {*} fn 
 */
export const getSafely = (fn) => {
  try{
    return fn();
  }catch(ex){
    return undefined;
  }
};