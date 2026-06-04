import { Select } from 'antd';
import type { SelectProps } from 'antd';
import type { Project } from '../../types';

type ProjectSelectProps = SelectProps & {
  projects?: Project[];
};

export function ProjectSelect({ projects = [], ...props }: ProjectSelectProps) {
  const options = projects.map((project) => ({ label: `${project.externalName}${project.modelName ? ` · ${project.modelName}` : ''}`, value: project.id }));
  return <Select showSearch allowClear optionFilterProp="label" options={options} {...props} />;
}
