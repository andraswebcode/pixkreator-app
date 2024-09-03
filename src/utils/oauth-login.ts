import axios from '../axios';
import { UserData } from '../store/user';
import { SocialLoginProvider } from '../types/common';

const oauthLogin = (provider: SocialLoginProvider) => {
	return new Promise<{ user: UserData }>((resolve, reject) => {
		axios
			.get('oauth/' + provider)
			.then(({ data }) => {
				const width = 600;
				const height = 600;
				const left = window.innerWidth / 2 - width / 2;
				const top = window.innerHeight / 2 - height / 2;

				window.open(
					data.url,
					'oauthLogin',
					`width=${width},height=${height},top=${top},left=${left}`
				);

				window.addEventListener('message', (e) => {
					if (e.origin === window.location.origin) {
						resolve(e.data);
					} else {
						reject({ message: 'Cross origin error.' });
					}
				});
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export { oauthLogin };
