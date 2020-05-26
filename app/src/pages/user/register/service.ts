import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function checkMobileCount(param: any) {
  return request('/api/mobiles/count/', {
    method: 'GET',
    params: { mobile: param.value },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}
