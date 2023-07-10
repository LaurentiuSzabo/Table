/* The code is defining an interface named "Person" in TypeScript. An interface is a way to define the
structure of an object. In this case, the "Person" interface has several properties: */
export interface Person {
  name: string;
  type: string;
  email: string;
  phoneNo: string;
  companyName: string;
  address: string;
  children?: Person[];
  expanded?: boolean;
}
