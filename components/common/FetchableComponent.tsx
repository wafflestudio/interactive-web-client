import { JSXElement } from "@typescript-eslint/types/dist/generated/ast-spec";
import { ReactElement } from "react";

interface Props {
  data: any;
  isFetching: boolean;
  successComponent: JSXElement | ReactElement;
  failComponent: JSXElement | ReactElement;
}

export const FetchableComponent = ({
  data,
  isFetching,
  successComponent,
  failComponent,
}: Props) => {
  if (!isFetching && data) {
    return successComponent;
  } else if (!isFetching && !data) {
    return failComponent;
  } else if (isFetching && !data) {
    return <div>loading</div>;
  } else {
    return <div>fetching</div>;
  }
};
