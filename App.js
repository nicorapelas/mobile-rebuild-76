import React from 'react'
import { LogBox } from 'react-native'
import { useFonts } from '@use-expo/font'
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  Feather,
  Octicons,
} from '@expo/vector-icons'

import LoaderFullScreen from './src/components/common/LoaderFullScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as NavProvider } from './src/context/NavContext'
import { Provider as UniversalProvider } from './src/context/UniversalContext'
import { Provider as AttributeProvider } from './src/context/AttributeContext'
import { Provider as ContactInfoProvider } from './src/context/ContactInfoContext'
import { Provider as EmployHistoryProvider } from './src/context/EmployHistoryContext'
import { Provider as ExperienceProvider } from './src/context/ExperienceContext'
import { Provider as FirstImpressionProvider } from './src/context/FirstImpressionContext'
import { Provider as InterestProvider } from './src/context/InterestContext'
import { Provider as LanguageProvider } from './src/context/LanguageContext'
import { Provider as PersonalInfoProvider } from './src/context/PersonalInfoContext'
import { Provider as PersonalSummaryProvider } from './src/context/PersonalSummaryContext'
import { Provider as ReferenceProvider } from './src/context/ReferenceContext'
import { Provider as SecondEduProvider } from './src/context/SecondEduContext'
import { Provider as SkillProvider } from './src/context/SkillContext'
import { Provider as TertEduProvider } from './src/context/TertEduContext'
import { Provider as PhotoProvider } from './src/context/PhotoContext'
import { Provider as CertificateProvider } from './src/context/CertificateContext'
import { Provider as ShareCVProvider } from './src/context/ShareCVContext'
import { Provider as BurgerMenuProvider } from './src/context/BurgerMenuContext'
import { Provider as AffiliateProvider } from './src/context/AffiliateContext'
import { Provider as ConfigProvider } from './src/context/ConfigContext'
import { Provider as AdvertisementReducer } from './src/context/AdvertisementContext'
import AppScreens from './AppScreens'

LogBox.ignoreLogs([
  'Warning: Overlay: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
])

const customFonts = {
  oswaldBold: require('./assets/fonts/oswald/Oswald-Bold.ttf'),
  sourceSansProBold: require('./assets/fonts/sourceSansPro/SourceSansPro-Bold.ttf'),
  sourceSansProLight: require('./assets/fonts/sourceSansPro/SourceSansPro-Light.ttf'),
  sourceSansProExtraLight: require('./assets/fonts/sourceSansPro/SourceSansPro-ExtraLight.ttf'),
  ...FontAwesome.font,
  ...AntDesign.font,
  ...MaterialIcons.font,
  ...MaterialCommunityIcons.font,
  ...Ionicons.font,
  ...Entypo.font,
  ...Feather.font,
  ...Octicons.font,
}

export default function App() {
  const [isLoaded] = useFonts(customFonts)
  if (!isLoaded) return <LoaderFullScreen />
  return (
    <AuthProvider>
      <NavProvider>
        <ConfigProvider>
          <UniversalProvider>
            <BurgerMenuProvider>
              <AffiliateProvider>
                <ShareCVProvider>
                  <AttributeProvider>
                    <ContactInfoProvider>
                      <EmployHistoryProvider>
                        <ExperienceProvider>
                          <InterestProvider>
                            <FirstImpressionProvider>
                              <LanguageProvider>
                                <PersonalInfoProvider>
                                  <PersonalSummaryProvider>
                                    <ReferenceProvider>
                                      <SecondEduProvider>
                                        <SkillProvider>
                                          <TertEduProvider>
                                            <PhotoProvider>
                                              <CertificateProvider>
                                                <AdvertisementReducer>
                                                  <AppScreens />
                                                </AdvertisementReducer>
                                              </CertificateProvider>
                                            </PhotoProvider>
                                          </TertEduProvider>
                                        </SkillProvider>
                                      </SecondEduProvider>
                                    </ReferenceProvider>
                                  </PersonalSummaryProvider>
                                </PersonalInfoProvider>
                              </LanguageProvider>
                            </FirstImpressionProvider>
                          </InterestProvider>
                        </ExperienceProvider>
                      </EmployHistoryProvider>
                    </ContactInfoProvider>
                  </AttributeProvider>
                </ShareCVProvider>
              </AffiliateProvider>
            </BurgerMenuProvider>
          </UniversalProvider>
        </ConfigProvider>
      </NavProvider>
    </AuthProvider>
  )
}
