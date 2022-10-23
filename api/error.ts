import { AxiosError } from "axios";

export const loginError = (error: AxiosError) => {
  if (error.response?.status == 403) {
    window.alert(error.response?.data);
  }
};

export const signUpError = (error: AxiosError) => {
  if (error.response?.status == 400) {
    if (error.response?.data.user_id) {
      window.alert(error.response?.data.user_id);
    }
    if (error.response?.data.email) {
      window.alert(error.response?.data.email);
    }
  }
};

export const putMeError = (error: AxiosError) => {
  if (error.response?.status == 400) {
    if (error.response?.data.user_id) {
      window.alert(error.response?.data.user_id);
    }
    if (error.response?.data.email) {
      window.alert(error.response?.data.email);
    }
  }
  if (error.response?.status == 403) {
    window.alert(error.response?.data);
  }
};

export const deleteMeError = (error: AxiosError) => {
  if (error.response?.status == 403) {
    window.alert(error.response?.data);
  }
};

export const getUserError = (error: AxiosError) => {
  if (error.response?.status == 404) {
    window.alert(error.response?.data.detail);
  }
};

export const postProjectError = (error: AxiosError) => {
  if (error.response?.status === 400) {
    window.alert("제목을 입력하세요");
  }
};
