const getActionData = (func, args) => {
  const defaultArg  = args.length === 1 ? args[0] : args
  return typeof func === 'function' ? func(...args) : defaultArg
}

const createStateActionFunc = (actionType, payloadCreator, metaCreator) =>
  (...args) => (dispatch, getState) => dispatch({
    type: actionType,
    payload: getActionData(payloadCreator, [{ dispatch, getState }].concat(args)),
    meta: getActionData(metaCreator, args),
  })

const createActionFunc = (actionType, payloadCreator, metaCreator) =>
  (...args) => ({
    type: actionType,
    payload: getActionData(payloadCreator, args),
    meta: getActionData(metaCreator, args),
  })

const functionCreator = (func) => (actionName, payloadCreator, metaCreator) => {
  const creator = (...args) => func(
    actionName, payloadCreator, metaCreator
  )(...args)
  creator.toString = () => actionName
  return creator;
}

export const createAction = (actionName, payloadCreator, metaCreator) => {
  return functionCreator(createActionFunc)(actionName, payloadCreator, metaCreator)
};

export const createActionWithState = (actionName, payloadCreator, metaCreator) => {
  return functionCreator(createStateActionFunc)(actionName, payloadCreator, metaCreator)
};
