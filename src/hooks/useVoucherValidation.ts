import React, { useEffect } from 'react';
import { SessionStorage } from '@/shared/utils/storage';
import { useVoucherStore } from '@/stores/voucher/useVoucherStore';

const useVoucherValidation = () => {
  const { voucherProduct, voucherInfo, dispatchVoucherInfo, dispatchValidations } = useVoucherStore();

  useEffect(() => {
    if (voucherInfo.user.name) {
      // eslint-disable-next-line no-useless-escape
      if (/\s/g.test(voucherInfo.user.name) || /[!@#\$%\^\&*\)\(+=._-]/g.test(voucherInfo.user.name)) {
        dispatchValidations({ type: 'USER_NAME_SPECIAL_CHARACTERS' });
        return;
      }
      dispatchValidations({ type: 'USER_NAME_COMPLETE' });
      return;
    }
    dispatchValidations({ type: 'USER_NAME_NULL' });
  }, [voucherInfo.user.name]);

  useEffect(() => {
    if (voucherInfo.user.phoneNumber === '') {
      dispatchValidations({ type: 'PHONE_NUMBERS_NULL' });
      return;
    }
    if (!voucherInfo.user.phoneNumber) return;

    let str = voucherInfo.user.phoneNumber;
    str = str.replace(/[^0-9]/g, '');
    let tmp = '';
    if (str.length < 4) tmp = str;
    else if (str.length < 7) tmp = `${str.substr(0, 3)}-${str.substr(3)}`;
    else if (str.length < 11) tmp = `${str.substr(0, 3)}-${str.substr(3, 3)}-${str.substr(6)}`;
    else tmp = `${str.substr(0, 3)}-${str.substr(3, 4)}-${str.substr(7)}`;
    if (tmp !== voucherInfo.user.phoneNumber) {
      dispatchVoucherInfo({ type: 'CHANGE_PHONE_NUMBER', value: tmp });
      return;
    }
    if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(tmp)) {
      dispatchValidations({ type: 'PHONE_NUMBERS_INVALID' });
      return;
    }
    dispatchValidations({ type: 'PHONE_NUMBERS_COMPLETE' });
  }, [voucherInfo.user.phoneNumber]);

  useEffect(() => {
    if (voucherInfo.phoneAuth) {
      dispatchValidations({ type: 'PHONE_AUTH_COMPLETE' });
      return;
    }
    dispatchValidations({ type: 'PHONE_AUTH_INVALID' });
  }, [voucherInfo.phoneAuthCode, voucherInfo.phoneAuthToken, voucherInfo.phoneAuth]);

  useEffect(() => {
    if (voucherInfo.user.email === '' || !voucherInfo.user.email) {
      dispatchValidations({ type: 'EMAIL_COMPLETE' });
      return;
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(voucherInfo.user.email)) {
      dispatchValidations({ type: 'EMAIL_INVALID' });
      return;
    }
    dispatchValidations({ type: 'EMAIL_COMPLETE' });
  }, [voucherInfo.user.email]);

  const requiredAgreements = Object.entries(voucherInfo.agreement)
    .map(([key, value]) => {
      return {
        name: key,
        value: value,
      };
    })
    .filter((item) => {
      const softCheckArr = ['MARKETING', 'LATE_NIGHT_MARKETING', 'KEEP_ACTIVE_EVEN_DORMANT', 'saveCard'];
      return !softCheckArr.includes(item.name);
    });

  useEffect(() => {
    if (requiredAgreements.every((item) => item.value === true)) {
      dispatchValidations({ type: 'AGREEMENT_COMPLETE' });
      return;
    }
    dispatchValidations({ type: 'AGREEMENT_INVALID' });
  }, [voucherInfo]);
};

export default useVoucherValidation;
