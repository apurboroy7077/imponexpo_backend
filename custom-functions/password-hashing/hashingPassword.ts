import bcrypt from "bcryptjs";
let saltRounds = 10;
let hashMyPassword = (plainPassword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(
      plainPassword,
      saltRounds,
      (error: Error | null, hashedPassword: string) => {
        if (error) {
          console.log(error);
          reject(error);
          return;
        } else {
          resolve(hashedPassword);
          return;
        }
      }
    );
  });
};
let checkPassword = (plainPassword: string, hashedPassword: string) => {
  return new Promise((resolve, reject) => {
    let isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
    resolve(isMatch);
  });
};
export { bcrypt, hashMyPassword, checkPassword };
