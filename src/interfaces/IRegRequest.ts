export default interface IRegRequest {
  type: 'reg';
  data: {
    name: string;
    password: string;
  };
  id: 0;
}
