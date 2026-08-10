import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React from 'react';

import LanguageDropdown from '@/components/LanguageDropdown';

import {
  LangNames,
  D2_LANG,
  MERMAID_LANG,
  GRAPHVIZ_LANG,
  PLANTUML_LANG,
} from '@/constant/langs';

import CheckIcon from '~/svg/checkcircle.svg';
import InfoIcon from '~/svg/info.svg';
import XIcon from '~/svg/x.svg';

type Feature = {
  title: string;
  description: string;
  value: {
    [name: typeof LangNames[number]]: any;
  };
};

const features: Feature[] = [
  {
    title: 'Open source',
    description: 'The language is free and open-source.',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: true,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'License',
    description: 'The license that governs terms of usage.',
    value: {
      [D2_LANG]: 'MPL 2.0',
      [MERMAID_LANG]: 'MIT',
      [GRAPHVIZ_LANG]: 'CPL 1.0',
      [PLANTUML_LANG]: 'GPL 3.0',
    },
  },
  {
    title: 'Downloadable CLI',
    description:
      'Is a runnable download available (if not, it requires building from source).',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: true,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Server-side execution',
    description: 'Can the language render diagrams without a browser.',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: true,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Container edges',
    description:
      'Edges going from or to containers is very popular in software architecture diagrams.',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: 'Hacky',
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Released in',
    description: 'First year of public release',
    value: {
      [D2_LANG]: 2022,
      [MERMAID_LANG]: 2014,
      [GRAPHVIZ_LANG]: 1991,
      [PLANTUML_LANG]: 2009,
    },
  },
  {
    title: 'Maintenance',
    description: 'Is the language actively maintained',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: `"This project has only 3 of its founders remaining as volunteer maintainers, and support is limited and may end soon." - Graphviz's README`,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Compiler language',
    description: 'The language it is implemented in',
    value: {
      [D2_LANG]: `Go`,
      [MERMAID_LANG]: `Javascript/Typescript`,
      [GRAPHVIZ_LANG]: `C`,
      [PLANTUML_LANG]: `Java`,
    },
  },
  {
    title: 'Editor support',
    description: 'The state of editor support for the language',
    value: {
      [D2_LANG]: `Creator-made extensions for VSCode and Vim`,
      [MERMAID_LANG]: `Community-made extensions for VSCode and Atom`,
      [GRAPHVIZ_LANG]: `Community-made extensions for VSCode, Vim, most IDEs`,
      [PLANTUML_LANG]: `Community-made extensions for VSCode, Vim, Atom`,
    },
  },
  {
    title: 'Themes',
    description: 'Configurable themes for diagrams',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: true,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Friendly error messages',
    description: 'Not just "syntax error"',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'Images & Icons',
    description: 'What are the available options for including images and icons',
    value: {
      [D2_LANG]: 'Any URL',
      [MERMAID_LANG]: 'FontAwesome. Hacky <img> tags',
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: 'Any URL',
    },
  },
  {
    title: 'Sequence diagrams',
    description: 'The best part of UML',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'SQL tables',
    description: 'Support for Entity-Relational-Diagrams (ERD)',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Markdown',
    description: 'Use Markdown for text objects in the diagram',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: 'Bold & Italic',
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'Code snippets',
    description: 'Render syntax-highlighted code snippets',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'LaTeX',
    description: 'Render math equations suitable for academic usage',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: true,
    },
  },
  {
    title: 'Accessibility',
    description:
      'Support for accessibility options like description tags for screen readers',
    value: {
      [D2_LANG]: false,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'Autoformat',
    description: 'Language tooling to autoformat a file',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'Native Github rendering',
    description: 'Does it render natively on Github',
    value: {
      [D2_LANG]: false,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'Responsive dark mode',
    description:
      'Can the diagram render with both light and dark mode, switching depending on user preference',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: false,
      [GRAPHVIZ_LANG]: false,
      [PLANTUML_LANG]: false,
    },
  },
  {
    title: 'PDF exports',
    description: 'Can the CLI export PDF output',
    value: {
      [D2_LANG]: true,
      [MERMAID_LANG]: true,
      [GRAPHVIZ_LANG]: true,
      [PLANTUML_LANG]: 'With additional installs',
    },
  },
];

const FeatureValue = (props: { value: any; className?: string }) => {
  let el;
  if (typeof props.value === 'boolean') {
    el = props.value ? <CheckIcon className='h-8 w-8' /> : <XIcon className='h-8 w-8' />;
  } else {
    el = <div className=''>{props.value}</div>;
  }
  return (
    <div
      className={classnames(
        'flex w-full items-center justify-center px-2',
        props.className
      )}
    >
      {el}
    </div>
  );
};

const Features = () => {
  const [featureLanguage1, setFeatureLanguage1] = React.useState<
    typeof LangNames[number]
  >(LangNames[0]);
  const [featureLanguage2, setFeatureLanguage2] = React.useState<
    typeof LangNames[number]
  >(LangNames[1]);

  const renderFeature = (
    feature: Feature,
    language1: typeof LangNames[number],
    language2: typeof LangNames[number],
    isMobile?: boolean
  ) => {
    if (isMobile) {
      return (
        <div
          className='flex w-full flex-col p-4 odd:bg-steel-100 even:bg-white'
          key={feature.title}
        >
          <span className='mb-2 flex items-center justify-center gap-2'>
            <span className='font-primary-medium text-lg'>{feature.title}</span>
            <Tippy content={feature.description} arrow={false}>
              <div>
                <InfoIcon />
              </div>
            </Tippy>
          </span>
          <div className='relative flex items-stretch justify-center'>
            <FeatureValue
              className='border-r border-dashed border-steel-300'
              value={feature.value[language1]}
            />
            <FeatureValue value={feature.value[language2]} />
          </div>
        </div>
      );
    }

    return (
      <tr className='odd:bg-blue-25 even:bg-white' key={feature.title}>
        <td className='rounded-l border-r border-dashed border-steel-300 p-4 text-left'>
          <span className='flex hidden items-baseline md:inline-block'>
            <span className='font-primary-medium'>{feature.title}:</span>{' '}
            {feature.description}
          </span>
          <span className='flex items-center gap-2 md:hidden'>
            <span className='font-primary-medium'>{feature.title}</span>
            <Tippy content={feature.description} arrow={false}>
              <div>
                <InfoIcon />
              </div>
            </Tippy>
          </span>
        </td>
        <td className='border-r border-dashed border-steel-300 p-4'>
          <FeatureValue value={feature.value[language1]} />
        </td>
        <td className='rounded-r p-4'>
          <FeatureValue value={feature.value[language2]} />
        </td>
      </tr>
    );
  };

  const renderDesktop = () => {
    return (
      <table className='mb-16 hidden w-full mobile:table'>
        <thead>
          <tr>
            <th className='mr-2 border-r border-dashed border-steel-300 text-left font-primary-medium text-lg'>
              Features
            </th>
            <th className='w-40 border-r border-dashed border-steel-300 px-4 lg:w-64'>
              <LanguageDropdown
                className='w-40 lg:w-64'
                index={1}
                activeLang={featureLanguage1}
                setActive={setFeatureLanguage1}
              />
            </th>
            <th className='w-40 pl-4 lg:w-64'>
              <LanguageDropdown
                className='w-40 lg:w-64'
                index={2}
                activeLang={featureLanguage2}
                setActive={setFeatureLanguage2}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) =>
            renderFeature(feature, featureLanguage1, featureLanguage2)
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className='h-2 border-r border-dashed' />
            <td className='border-r border-dashed' />
            <td />
          </tr>
        </tfoot>
      </table>
    );
  };

  const renderMobile = () => {
    return (
      <div className='relative mb-8 flex w-full flex-col items-center mobile:hidden'>
        <div className='mb-3 font-primary-medium text-lg'>Features</div>
        <div className='mb-2 flex w-full gap-2'>
          <div className='w-1/2'>
            <LanguageDropdown
              className='w-full'
              index={1}
              activeLang={featureLanguage1}
              setActive={setFeatureLanguage1}
            />
          </div>
          <div className='w-1/2'>
            <LanguageDropdown
              className='w-full'
              index={2}
              activeLang={featureLanguage2}
              setActive={setFeatureLanguage2}
            />
          </div>
        </div>
        {features.map((feature) =>
          renderFeature(feature, featureLanguage1, featureLanguage2, true)
        )}
      </div>
    );
  };

  return (
    <div id='features'>
      {renderMobile()}
      {renderDesktop()}
    </div>
  );
};

export default Features;
