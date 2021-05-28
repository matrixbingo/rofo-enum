/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-05-28 10:42:38
 * @LastEditTime: 2021-05-29 00:11:27
 * @LastEditors: rodchen
 */
import _ from 'lodash';
import sourceData from './sourceData';
import {
  EnumItem,
  EnumBase,
  TypeEnum,
  InjectEnumObject,
  SourceData,
} from './Type';

const highForatFunction = (enumSourceData: EnumItem[]) => {
  // 根据数据源处理返回枚举类型
  const enumValue: EnumBase = {};

  _.forEach(enumSourceData, (item) => {
    enumValue[item.key] = item.value;
  });

  // 枚举数据源，根据value值获取lable文本值
  const getLabelByValue = (value: TypeEnum) => {
    const filterObject = _.filter(
      enumSourceData,
      (item) => item.value === value,
    );

    // 存在返回值，返回第一个匹配的数据
    if (filterObject.length) {
      return filterObject[0].label;
    }

    // 没有返回值的情况下，返回空
    return '';
  };

  return {
    enum: enumValue,
    getLabelByValue,
  };
};

const injectEnumFunction = (sourceDataKeyArray: string[]) => {
  // 数据类型检查
  if (!_.isArray(sourceDataKeyArray)) {
    throw new Error('注入失败，参数格式不正确');
  }

  const injectEnumOject: InjectEnumObject = {};

  _.forEach(sourceDataKeyArray, (item) => {
    // eslint-disable-next-line no-prototype-builtins
    if (sourceData.hasOwnProperty(item)) {
      injectEnumOject[item] = highForatFunction(sourceData[item]);
    } else {
      throw new Error(`注入失败，没有${item}对应的枚举数据`);
    }
  });
  return injectEnumOject;
};

export default injectEnumFunction;
