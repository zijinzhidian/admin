import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' 			//element自带的英文包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'			//element自带的中文包
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n);

const messages = {
	en: {
		...enLocale,
		...elementEnLocale
	},
	zh: {
		...zhLocale,
		...elementZhLocale
	}
}

const i18n = new VueI18n({
	locale: 'en',
	messages
});

export default i18n;
