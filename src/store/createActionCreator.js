export default function createActionCreator(type) {
  function actionCreator(payload) {
    return {
      type,
      payload
    };
  }
  actionCreator.toString = () => {
    return `${type}`;
  };
  return actionCreator;
}
