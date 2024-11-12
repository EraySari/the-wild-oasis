import { useEffect, useRef } from "react";

function useOutsideClick(event) {
  const ref = useRef(null);

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          event();
        }
      }

      document.addEventListener("click", handleClick, true); //olayi capturing asamasinda dinler yani asagi giderken(bubbling degil)

      return () => document.removeEventListener("click", handleClick);
    },
    [event] //useEffect dependency kurali(kullanilan stateler eklenir)
  );

  return ref;
}

export default useOutsideClick;
