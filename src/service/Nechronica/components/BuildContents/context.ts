import { type Dispatch, type SetStateAction, useState } from 'react'
import constate from 'constate'
import {
  type NechronicaBasic,
  type NechronicaCharacter,
  type NechronicaManeuver,
  type NechronicaRoice,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export const [NechronicaCharacterMakeProvider, useCharacterMakeContext] =
  constate(() => {
    const [characterType, setCharacterType] = useState<NechronicaType>('doll')
    const setCharacterTypeWrap: Dispatch<SetStateAction<NechronicaType>> = (
      value: NechronicaType | ((val: NechronicaType) => NechronicaType),
    ) => {
      setCharacterType(value)
      /*
       * 初期化
       */
      // 基本設計
      setPosition(0)
      setMainClass(0)
      setSubClass(0)
      setBonusStatus('armed')
      setAffection({
        armed: '',
        mutation: '',
        modification: '',
      })
      // 未練
      setRoiceList([])
      // パーソナルデータ
      setShuzoku('')
      setAge('')
      setBasePosition(0)
      setHeight('')
      setWeight('')
      setCarma('')
      setHairColor('')
      setEyeColor('')
      setSkinColor('')
    }

    // 基本設計
    const [position, setPosition] = useState<NechronicaBasic['position']>(0)
    const [mainClass, setMainClass] = useState<NechronicaBasic['mainClass']>(0)
    const [subClass, setSubClass] = useState<NechronicaBasic['subClass']>(0)
    const [bonusStatus, setBonusStatus] = useState<
      'armed' | 'mutation' | 'modification'
    >('armed')
    const [affection, setAffection] = useState({
      armed: '',
      mutation: '',
      modification: '',
    })

    // マニューバ
    const [maneuvers, setManeuvers] = useState<NechronicaManeuver[]>([])
    const addManeuver = () => {
      const maneuver: NechronicaManeuver = {
        lost: false,
        used: false,
        type: 0,
        parts: 0,
        name: '名無し',
        timing: 0,
        cost: '',
        range: '',
        memo: '',
        shozoku: '',
        ignoreBravado: false,
        isBravado: false,
        isUnknown: false,
        isAdded: true,
      }
      setManeuvers((prev) => [...prev, maneuver])
    }
    const updateManeuver = (idx: number, maneuver: NechronicaManeuver) => {
      setManeuvers((prev) => {
        const newList = [...prev]
        newList[idx] = maneuver
        return newList
      })
    }
    const deleteManeuver = (index: number) => {
      setManeuvers((prev) => prev.filter((_, idx) => idx !== index))
    }

    // 未練
    const [roiceList, setRoiceList] = useState<NechronicaRoice[]>([])
    const addRoice = () => {
      const roice: NechronicaRoice = {
        id: 1,
        name: '名無し',
        damage: 0,
        memo: '',
      }
      setRoiceList((prev) => [...prev, roice])
    }
    const updateRoice = (idx: number, roice: NechronicaRoice) => {
      setRoiceList((prev) => {
        const newList = [...prev]
        newList[idx] = roice
        return newList
      })
    }
    const deleteRoice = (index: number) => {
      setRoiceList((prev) => prev.filter((_, idx) => idx !== index))
    }

    // パーソナルデータ
    const [characterName, setCharacterName] = useState('')
    const [tag, setTag] = useState('')
    const [shuzoku, setShuzoku] = useState('')
    const [age, setAge] = useState('')
    const [basePosition, setBasePosition] = useState(0)
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [carma, setCarma] = useState('')
    const [hairColor, setHairColor] = useState('')
    const [eyeColor, setEyeColor] = useState('')
    const [skinColor, setSkinColor] = useState('')

    // メモ
    const [memo, setMemo] = useState('')

    const makingNechronicaCharacter: NechronicaCharacter = {
      id: '',
      name: characterName,
      additionalData: {
        type: characterType,
        sheetId: '',
        stared: false,
      },
      sheetData: {
        basic: {
          characterName,
          position,
          mainClass,
          subClass,
          bonusStatus,
          affection,
          basePosition,
          hairColor,
          eyeColor,
          skinColor,
          height,
          weight,
          age,
          shuzoku,
          carma,
        },
        maneuverList: maneuvers,
        roiceList: roiceList,
      },
      owner: '-',
      public: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return {
      makingNechronicaCharacter,
      characterType,
      setCharacterType: setCharacterTypeWrap,

      // 基本設計
      position,
      setPosition,
      mainClass,
      setMainClass,
      subClass,
      setSubClass,
      bonusStatus,
      setBonusStatus,
      affection,
      setAffection,

      // マニューバ
      maneuvers,
      setManeuvers,
      addManeuver,
      updateManeuver,
      deleteManeuver,

      // 未練
      roiceList,
      addRoice,
      updateRoice,
      deleteRoice,

      // パーソナルデータ
      characterName,
      characterNameSet: [
        'キャラクター名',
        characterName,
        setCharacterName,
        'required',
      ] as const,
      tag,
      tagSet: ['タグ', tag, setTag] as const,
      shuzoku,
      shuzokuSet: ['種族', shuzoku, setShuzoku] as const,
      age,
      ageSet: ['享年', age, setAge] as const,
      basePosition,
      setBasePosition,
      height,
      heightSet: ['身長', height, setHeight] as const,
      weight,
      weightSet: ['体重', weight, setWeight] as const,
      carma,
      carmaSet: ['暗示', carma, setCarma] as const,
      hairColor,
      hairColorSet: ['髪の色', hairColor, setHairColor] as const,
      eyeColor,
      eyeColorSet: ['瞳の色', eyeColor, setEyeColor] as const,
      skinColor,
      skinColorSet: ['肌の色', skinColor, setSkinColor] as const,

      // メモ
      memo,
      setMemo,
    }
  })
