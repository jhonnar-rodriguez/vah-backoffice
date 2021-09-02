import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetTracesAction } from "../../../../store/actions/general/trace/TraceAction";

const useLoadTraces = () => {
  const dispatch = useDispatch();

  const loadTraces = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetTracesAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadTraces();
  }, [loadTraces]);

  return [];
}

export default useLoadTraces;
