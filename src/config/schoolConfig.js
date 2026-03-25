// config/schoolStructure.js
import { nigeriaSchoolStructure } from './nigeria-curriculum.js'
import { ghanaSchoolStructure } from './ghana-curriculum.js'
import { kenyaSchoolStructure } from './kenya-curriculum.js'
import { southAfricaSchoolStructure } from './south-africa-curriculum.js'
import { ukSchoolStructure } from './uk-curriculum.js'
import { usSchoolStructure } from './us-curriculum.js'

export const curriculumMap = {
  NG: nigeriaSchoolStructure,
  GH: ghanaSchoolStructure,
  KE: kenyaSchoolStructure,
  ZA: southAfricaSchoolStructure,
  GB: ukSchoolStructure,
  US: usSchoolStructure
}

export const getSchoolStructure = (countryCode) => {
  return curriculumMap[countryCode]
}
