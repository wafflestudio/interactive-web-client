interface Props {
  children: JSX.Element;
  data: any;
  isFetching: boolean;
}

export const FetchableComponent = ({ children, data, isFetching }: Props) => {
  if (Array.isArray(children) && children.length > 3) {
    const components = children as JSX.Element[];
    const [success, fail, loading, fetching] = components;

    if (!isFetching && data) {
      return success;
    } else if (!isFetching && !data) {
      return fail;
    } else if (isFetching && !data) {
      return loading;
    } else {
      return fetching;
    }
  } else {
    return <div>Wrong FetchableComponent Call</div>;
  }
};

export const fetchableComponents =
  <T,>(data: T, isFetching: boolean) =>
  (SuccessComponent: JSX.Element) =>
  (FailComponent: JSX.Element) =>
  (LoadingComponent: JSX.Element) =>
  (FetchingComponent: JSX.Element) => {
    if (!isFetching && data) {
      return SuccessComponent;
    } else if (!isFetching && !data) {
      return FailComponent;
    } else if (isFetching && !data) {
      return LoadingComponent;
    } else {
      return FetchingComponent;
    }
  };
