import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startSetNavigationAction } from "../../../store/actions/navigation/NavigationAction";

const useSetNavigation = (title: string) => {
  const dispatch = useDispatch();

  const setNavigationCallback = useCallback(
    () => {
      const dispatcher = () => dispatch(startSetNavigationAction(title))
      dispatcher();
    },
    [title, dispatch],
  )

  useEffect(() => {
    setNavigationCallback();
  }, [setNavigationCallback])

  return [];
}

export default useSetNavigation;
