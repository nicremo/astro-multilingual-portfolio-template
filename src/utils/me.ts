export const name = "Fabian Bitzer";
export const homepage_url = "https://fabian-bitzer.de/";
export const linkedin_username = "fabian-bitzer";
export const github_username = "nicremo";

/*=============================================================================\
 | The email, phone number, and address fields below are Base64 encoded to     |
 | obfuscate them in the source code.  To update them, encode the data in      |
 | Base64 and paste the output as a string argument to the corresponding       |
 | `atob()` function below.                                                    |
 |                                                                             |
 | Mac command to Base64 encode (and copy the encoded data to the clipboard):  |
 |                                                                             |
 |     echo -n 'kontakt@bitzer-fabian.de' | base64 | pbcopy                    |
 |                                                                             |
 | Linux command to Base64 encode:                                             |
 |                                                                             |
 |     echo -n 'kontakt@bitzer-fabian.de' | base64                             |
 |                                                                             |
 | JavaScript command to Base64 encode:                                        |
 |                                                                             |
 |     btoa('kontakt@bitzer-fabian.de')                                        |
 |                                                                             |
 \============================================================================*/
const email_base64_encoded = "a29udGFrdEBiaXR6ZXItZmFiaWFuLmRl";
const phone_base64_encoded = "KzQ5IDE3OCA3MjY5MTc4";

// The address fields below are for the privacy policy. They are also Base64 encoded.
const address_line_1_base64_encoded = "MTIzIE1haW4gU3Q=";
const address_line_2_base64_encoded = "V2FzaGluZ3RvbiwgREM=";

// The data is decoded and exported below. Do not edit below this line.
export const email = atob(email_base64_encoded);
export const phone = atob(phone_base64_encoded);
export const address_line_1 = atob(address_line_1_base64_encoded);
export const address_line_2 = atob(address_line_2_base64_encoded);

// Helper code for creating URLs from the above data.
export const linkedin_short = `linkedin.com/in/${linkedin_username}`;
export const linkedin_url   = `https://www.linkedin.com/in/${linkedin_username}`;
export const github_url = `https://github.com/${github_username}`;
