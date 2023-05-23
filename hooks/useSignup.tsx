interface User {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const getUser = async (email: string) => {
    const resp = await fetch(`/api/user?email=${email}`);
    const data = await resp.json();
    return data;
  };

  const signUpUser = async (user: User) => {
    const resp = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    return data;
  };

  return { getUser, signUpUser };
};
