import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePartnerStore } from '@/stores/common/usePartnerStore';

const carrotApiHost = process.env.NEXT_PUBLIC_CARROT_API_HOST;

const useFetchPolicies = ({ url, dispatchInfo = (arg) => {}, requiredPolicies = [] }) => {
  const { partnerName } = usePartnerStore();
  const [servicePolicies, setServicePolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPolicy, setCurrentPolicy] = useState('');
  const [policiesList, setPoliciesList] = useState([]);

  const openServiceTerm = (type) => {
    const serviceUrl = servicePolicies.find((item) => item.type === type)?.content.KO.contentUrl;
    setCurrentPolicy(serviceUrl);
    return serviceUrl;
  };

  const getServicePolicies = () => {
    setLoading(true);
    let policyList = [];
    if (!requiredPolicies.length) {
      switch (partnerName) {
        case 'skt':
          policyList = ['SERVICE', 'PRIVACY_FOR_SKT', 'PRIVACY_FOR_SKT_THIRD_PARTY', 'VOUCHER_CANCEL_PENALTY', 'MARKETING', 'LATE_NIGHT_MARKETING', 'KEEP_ACTIVE_EVEN_DORMANT'];
          break;
        case 'tablemanager':
          policyList = [
            'SERVICE',
            'PRIVACY_FOR_PAYMENT',
            'PRIVACY_FOR_PAYMENT_THIRD_PARTY',
            'VOUCHER_CANCEL_PENALTY',
            'MARKETING',
            'LATE_NIGHT_MARKETING',
            'KEEP_ACTIVE_EVEN_DORMANT',
          ];
          break;

        case 'kb':
          policyList = ['SERVICE', 'PRIVACY_FOR_PAYMENT', 'PRIVACY_FOR_KB_PAY', 'VOUCHER_CANCEL_PENALTY', 'MARKETING', 'LATE_NIGHT_MARKETING', 'KEEP_ACTIVE_EVEN_DORMANT'];
          break;
        case 'mfg':
          policyList = [
            'SERVICE',
            'PRIVACY_FOR_PAYMENT',
            'PRIVACY_FOR_PAYMENT_THIRD_PARTY',
            'VOUCHER_CANCEL_PENALTY',
            'MARKETING',
            'LATE_NIGHT_MARKETING',
            'KEEP_ACTIVE_EVEN_DORMANT',
          ];
          break;
        case 'samsung':
          policyList = [
            'SERVICE',
            'PRIVACY_FOR_SAMSUNG_CARD',
            'PRIVACY_FOR_PAYMENT_THIRD_PARTY',
            'VOUCHER_CANCEL_PENALTY',
            'MARKETING',
            'LATE_NIGHT_MARKETING',
            'KEEP_ACTIVE_EVEN_DORMANT',
          ];
          break;
      }
      dispatchInfo({ type: 'CHANGE_AGREEMENT_LIST', value: [...policyList, ...(partnerName === 'tablemanager' ? ['saveCard'] : [])] });
    } else {
      policyList = requiredPolicies;
    }
    setPoliciesList(policyList);
    axios
      .get(carrotApiHost + url, { params: { servicePolicyType: policyList } })
      .then(({ data: response }) => {
        setServicePolicies(response.servicePolicies);
      })
      .catch(() => {
        alert('약관 정보를 불러오는데 실패하였습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getServicePolicies();
  }, []);

  return { servicePolicies, loading, openServiceTerm, currentPolicy, policiesList };
};

export { useFetchPolicies };
