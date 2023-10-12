import { Client } from 'linkedin-private-api';

const username = "probirds.ni@gmail.com";
const password = "S31@100402_linkedin";

(async () => {
  // Login
  const client = new Client();
  await client.login.userPass({username, password});
  
  const profile = await client.profile.getOwnProfile()
  console.log(profile)
})();