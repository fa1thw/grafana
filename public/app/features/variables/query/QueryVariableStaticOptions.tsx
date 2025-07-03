import { FormEvent } from 'react';

import { selectors } from '@grafana/e2e-selectors';
import { t, Trans } from '@grafana/i18n';
import { QueryVariable } from '@grafana/scenes';
import { VariableLegend } from 'app/features/dashboard-scene/settings/variables/components/VariableLegend';
import { VariableSelectField } from 'app/features/dashboard-scene/settings/variables/components/VariableSelectField';
import { VariableTextAreaField } from 'app/features/dashboard-scene/settings/variables/components/VariableTextAreaField';

export type StaticOptionsType = QueryVariable['state']['staticOptions'];
export type StaticOptionsOrderType = QueryVariable['state']['staticOptionsOrder'];

interface QueryVariableStaticOptionsProps {
  staticOptions: StaticOptionsType;
  staticOptionsOrder: StaticOptionsOrderType;
  onStaticOptionsChange: (staticOptions: StaticOptionsType) => void;
  onStaticOptionsOrderChange: (staticOptionsOrder: StaticOptionsOrderType) => void;
}

const SORT_OPTIONS = [
  { label: 'Before query values', value: 'before' },
  { label: 'After query values', value: 'after' },
  { label: 'Sorted with query values', value: 'sorted' },
];

export function QueryVariableStaticOptions(props: QueryVariableStaticOptionsProps) {
  const { staticOptions, onStaticOptionsChange, staticOptionsOrder, onStaticOptionsOrderChange } = props;

  const onStaticOptionsBlur = (event: FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    onStaticOptionsChange(value.trim() || undefined);
  };

  const value = SORT_OPTIONS.find((o) => o.value === staticOptionsOrder) ?? SORT_OPTIONS[0];

  return (
    <>
      <VariableLegend>
        <Trans i18nKey="dashboard-scene.query-variable-editor-form.static-options">Static options</Trans>
      </VariableLegend>

      <VariableTextAreaField
        name="Values separated by comma"
        defaultValue={staticOptions}
        // eslint-disable-next-line @grafana/i18n/no-untranslated-strings
        placeholder="1, 10, mykey : myvalue, myvalue, escaped\,value"
        onBlur={onStaticOptionsBlur}
        required
        width={52}
        testId={selectors.pages.Dashboard.Settings.Variables.Edit.QueryVariable.queryOptionsStaticOptionsInput}
      />

      <VariableSelectField
        name="Sort"
        description={t(
          'variables.query-variable-sort-select.description-values-variable',
          'How to sort the values of this variable'
        )}
        value={value}
        options={SORT_OPTIONS}
        onChange={(opt) => onStaticOptionsOrderChange(opt.value)}
        testId={selectors.pages.Dashboard.Settings.Variables.Edit.QueryVariable.queryOptionsStaticOptionsOrderDropdown}
        width={25}
      />
    </>
  );
}
