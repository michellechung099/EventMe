import { useState } from "react";
import { useDispatch } from "react-redux";

export function useInput(initialValue) {
  console.log(`initialValue: ${initialValue}`)
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return [value, onChange];
}

export function useSubmit({createAction, action, onSuccess, validate }) {
  // action: action object that will be dispatched when form is submitted
  // createAction: function that creates action object if action not provided
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  if (!action) {
    // if action object is not defined
    action = createAction?.();
    // if createAction is not null/undefined, call it as a function to create action object
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validate?.();
    if (errors) {
      setErrors(errors);
    } else {
      setErrors([]);
      return dispatch(action).then(
        onSuccess,
        async (res) => {
          let data;
          try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
          } catch {
            data = await res.text(); // Will hit this case if, e.g., server is down
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        }
      )
    }

  }

  return [errors, onSubmit];
}
