import { clone, convertNumberZero } from '../../common/PrimaryDataUtility.ts'
import { getJsonByGet, getJsonByJsonp } from '../../common/fetch-util.ts'

export type NechronicaViewOption = {
  roicePosition: 'before' | 'after' | 'none'
  viewLabel: '' | 'timing' | 'cost' | 'range'
  viewLost: boolean
  viewUsed: boolean
  viewUnknown: boolean
  viewOnlyAdded: boolean
  viewOnlyIsBravado: boolean
  viewOnlyBravadoTarget: boolean
  viewOnlyIgnoreBravado: boolean
  selectedTimings: number[]
  selectedTypes: number[]
}

export type NechronicaManeuver = {
  lost: boolean
  used: boolean
  type: number
  parts: number // hantei
  name: string
  timing: number
  cost: string
  range: string
  memo: string
  shozoku: string
  ignoreBravado: boolean
  isBravado: boolean
  isUnknown: boolean
  isAdded: boolean
}

export type NechronicaRoice = {
  id: number
  name: string // 対象
  damage: number // 狂気度
  memo: string // 備考など
}

export const posSelections = new Array(31).fill(null).map((_, idx) => ({
  value: idx,
  text: `Nechronica.ROICE.${idx}.pos`,
  subTitle: `Nechronica.ROICE.${idx}.target`,
  color: 'black',
}))

export type NechronicaType = 'doll' | 'legion' | 'horror' | 'savant'

export type NechronicaBasic = {
  characterName: string
  position: number
  mainClass: number // MCLS
  subClass: number // SCLS
  basePosition: number // 0: 煉獄, 1: 花園, 2: 楽園
  hairColor: string
  eyeColor: string
  skinColor: string
  height: string
  weight: string
  age: string
  shuzoku: string
  carma: string
}

export type Nechronica = {
  url: string
  sheetId: string
  basic: NechronicaBasic
  maneuverList: NechronicaManeuver[]
  roiceList: NechronicaRoice[]
}

export type NechronicaManeuverStackType = 'use' | 'lost' | 'move'

export type NechronicaManeuverStack = {
  characterId: string
  place: number
  type: NechronicaManeuverStackType
  status: '' | 'resolved'
  start: number
  end: number
} & (
  | {
      type: 'use'
      maneuverIndex: number
      cost: number
    }
  | {
      type: 'lost'
      maneuverIndex: number
    }
  | {
      type: 'move'
      beforePlace: number
    }
)

export type NechronicaManeuverStackBase = Pick<
  NechronicaManeuverStack,
  'characterId' | 'place' | 'status' | 'start' | 'end'
>

export type NechronicaSingleton = {
  battleCount?: number
  maneuverStack?: NechronicaManeuverStack[]
}

export type NechronicaCopiableWrap = {
  position: number
  actionValue: number
  health: number
  hide: boolean
  maxActionValue: number
  spineCount: number
}

export type NechronicaWrap = NechronicaCopiableWrap & {
  player: string
  type: NechronicaType
  character: Nechronica
}

export function getActionValueNum(text: string): number {
  const matchResult = text.match(/-?[0-9０-９]+/)
  const numText = matchResult
    ?.at(0)
    ?.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
  return numText ? parseInt(numText, 10) : 0
}

export class NechronicaDataHelper {
  protected readonly url: string
  protected readonly sheetId: string
  protected readonly urlRegExp: RegExp
  protected readonly jsonpUrlFormat: string
  protected readonly t: (r: string) => string

  static async fetch(sheetId: string, t: (r: string) => string = (r) => r) {
    const url = `https://charasheet.vampire-blood.net/${sheetId}`
    const helper = new NechronicaDataHelper(sheetId, url, t)
    if (!helper.isThis()) return null
    const data = (await helper.getData())?.data
    if (!data) return null
    return data
  }

  public constructor(sheetId: string, url: string, t: (r: string) => string) {
    this.url = url
    this.sheetId = sheetId
    // https://charasheet.vampire-blood.net/1713315
    this.urlRegExp = /https?:\/\/charasheet\.vampire-blood\.net\/([^&]+)/
    this.jsonpUrlFormat =
      'https://charasheet.vampire-blood.net/{key}.js?callback=getJson'
    this.t = t
  }

  /**
   * このシステムに対応しているキャラシのURLかどうかを判定する
   * @return true: 対応したキャラシである, false: 対応したキャラシではない
   */
  public isThis(): boolean {
    return this.urlRegExp.test(this.url)
  }

  public async getData(): Promise<{
    jsons: never[] | null
    data: Nechronica | null
  }> {
    const jsons = await this.getJsonData()
    const data = this.createData(jsons)
    return {
      jsons,
      data,
    }
  }

  /**
   * JSONPで対象のURLのデータを取得する
   * @param url 省略された場合はコンストラクタに引き渡されたURLが利用される
   * @param type jsonp or get 省略された場合は jsonp
   * @protected
   * @return JSONPの生データ
   */
  private async getJsonData(
    type: 'jsonp' | 'get' = 'jsonp',
    url: string = this.url,
  ): Promise<never[] | null> {
    try {
      const matchResult = url.match(this.urlRegExp)
      const key = matchResult ? matchResult[1] : null
      const jsonUrl = this.jsonpUrlFormat.replace('{key}', key || '')

      const results: never[] = []
      results.push(
        type === 'jsonp'
          ? await getJsonByJsonp(jsonUrl)
          : await getJsonByGet(jsonUrl),
      )
      return results
    } catch {
      return null
    }
  }

  /**
   * JSONPから取得した生データから処理用のデータを生成する
   * @param jsons JSONPから取得した生データ
   * @protected
   */
  private createData(jsons: never[] | null): Nechronica | null {
    if (!jsons || !jsons.length) return null
    const json = jsons[0]
    if (!json['Power_Lost'] || !json['roice_name']) return null
    const digNum = (obj: never, prop: string) => {
      const value = obj[prop] as string | undefined
      return convertNumberZero(value)
    }
    const digText = (obj: never, prop: string) => {
      const value = obj[prop] as string | undefined
      return textFilter(value)
    }
    const textFilter = (text: string | null | undefined) => {
      if (!text) return ''
      return text.trim().replace(/\r?\n/g, '\n')
    }
    const transpose = (a: never[][]): never[][] => {
      return a[0].map((_, c) => a.map((r) => r[c]))
    }

    const maneuvers = [
      json['Power_Lost'],
      json['Power_Used'],
      json['Power_Type'],
      json['Power_hantei'],
      json['Power_name'],
      json['Power_timing'],
      json['Power_cost'],
      json['Power_range'],
      json['Power_memo'],
      json['Power_shozoku'],
    ]
    const maneuverList = transpose(maneuvers).map((list) => {
      const name = textFilter(list[4])
      const shozoku = textFilter(list[9])
      const data: NechronicaManeuver = {
        lost: list[0] !== '0',
        used: list[1] !== '0',
        type: convertNumberZero(list[2]),
        parts: convertNumberZero(list[3]),
        name,
        timing: convertNumberZero(list[5]),
        cost: textFilter(list[6]),
        range: textFilter(list[7]),
        memo: textFilter(list[8]),
        shozoku,
        isBravado: ['平気', '自動制御装置'].includes(name),
        ignoreBravado: false,
        isAdded: false,
        isUnknown: shozoku.includes('隠匿'),
      }
      return data
    })
    const roice = [
      json['roice_name'],
      json['roice_pos'],
      json['roice_id'],
      json['roice_damage'],
      json['roice_neg'],
      json['roice_break'],
      json['roice_memo'],
    ]
    const roiceList: NechronicaRoice[] = transpose(roice)
      .map((list) => {
        const name: string = textFilter(list[0])
        const damage: number = convertNumberZero(list[3])
        const id: number = convertNumberZero(list[2])
        const memo: string = textFilter(list[6])
        const data: NechronicaRoice = {
          id,
          name,
          damage,
          memo,
        }
        return data
      })
      .filter((r) => Boolean(r.name))
    return {
      url: this.url,
      sheetId: this.sheetId,
      basic: {
        characterName: digText(json, 'pc_name') || digText(json, 'data_title'),
        position: digNum(json, 'position'),
        mainClass: convertNumberZero(json['MCLS']),
        subClass: convertNumberZero(json['SCLS']),
        basePosition: parseInt(json['SL_sex'], 10),
        hairColor: digText(json, 'color_hair'),
        eyeColor: digText(json, 'color_eye'),
        skinColor: digText(json, 'color_skin'),
        height: digText(json, 'pc_height'),
        weight: digText(json, 'pc_weight'),
        age: digText(json, 'age'),
        shuzoku: digText(json, 'shuzoku'),
        carma: digText(json, 'pc_carma'),
      },
      maneuverList,
      roiceList,
    }
  }
}

export type DataType = 'maneuver' | 'roice' | 'basic'
export const fullDataType: DataType[] = ['maneuver', 'roice', 'basic']

export function mergeNechronica(
  oldData: Nechronica,
  mergeData: Nechronica,
  targets: DataType[],
): Nechronica {
  const result: Nechronica = clone<Nechronica>(oldData)!

  result.url = mergeData.url
  if (targets.includes('basic')) result.basic = clone(mergeData.basic)!
  if (targets.includes('roice')) result.roiceList = clone(mergeData.roiceList)!
  if (targets.includes('maneuver')) {
    // 主催者が追加したマニューバは引き継がせる
    const addedManeuvers = result.maneuverList.filter((m) => m.isAdded)
    result.maneuverList = clone(mergeData.maneuverList)!
    result.maneuverList.push(...addedManeuvers)
  }

  return result
}

export function judgeView(
  viewOption: NechronicaViewOption | null,
  maneuver: NechronicaManeuver,
): boolean {
  if (!viewOption) return true
  if (viewOption.viewOnlyAdded && !maneuver.isAdded) return false
  if (!viewOption.viewUnknown && maneuver.isUnknown) return false
  if (
    viewOption.viewOnlyIsBravado &&
    (!maneuver.isBravado || maneuver.isUnknown)
  )
    return false
  if (
    viewOption.viewOnlyBravadoTarget &&
    (!maneuver.lost || maneuver.ignoreBravado)
  )
    return false
  if (viewOption.viewOnlyIgnoreBravado && !maneuver.ignoreBravado) return false
  if (maneuver.isUnknown) return true
  if (maneuver.lost && !viewOption.viewLost) return false
  if (maneuver.used && !viewOption.viewUsed) return false
  if (!viewOption.selectedTimings.includes(maneuver.timing)) return false
  return viewOption.selectedTypes.includes(maneuver.type)
}

export const NON_BATTLE_COUNT = Number.MIN_SAFE_INTEGER + 1
