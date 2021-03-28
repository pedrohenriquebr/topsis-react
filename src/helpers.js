import i18n from './i18n';
export function criteriaToDataColumns (criteria){
    return [{field: 'name', headerName: i18n.t('DATA_COLUMN_NAME'), width: 200},
    ...criteria.map((d) => ({
    field: d.criterionName,
    headerName: [...d.criterionName[0].toUpperCase(), d.criterionName.slice(1)],
    type: "number",
    width: 160 
  }))]
}