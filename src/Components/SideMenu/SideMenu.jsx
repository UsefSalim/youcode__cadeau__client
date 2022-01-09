import {
  SettingsAccordion,
  SettingsAccordionItem,
  SettingsAccordionItemButton,
  SettingsAccordionItemHeading,
  SettingsAccordionPanel,
  SettingsAccordionPanelItem,
} from '@laazyry/sobrus-design-system';
import React from 'react';
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import { settingsAccordion } from 'Values/SideMeduPath';

const SideMenu = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <SettingsAccordion
        allowZeroExpanded
        preExpanded={[
          `${
            location.pathname === '/settings/jobs'
              ? '/settings/jobs'
              : `/${location.pathname.split('/')[1]}/${JSON.parse(
                  localStorage.getItem('settingsPath')
                )}`
          }`,
        ]}
      >
        {settingsAccordion.map((settingAccordion, index) => (
          <SettingsAccordionItem uuid={settingAccordion.path}>
            <SettingsAccordionItemHeading>
              <SettingsAccordionItemButton>
                <div className='monSite-sideMenuItem'>
                  {/* <img src={settingAccordion.icon} style={{ marginRight: "1rem" }} /> */}
                  {settingAccordion.SettingsAccordionItemHeading}
                </div>
              </SettingsAccordionItemButton>
            </SettingsAccordionItemHeading>
            <SettingsAccordionPanel>
              {settingAccordion.SettingsAccordionPanelItems.map((settingAccordionPanelItem) => (
                <SettingsAccordionPanelItem
                  active={location.pathname === settingAccordionPanelItem.path}
                  onClick={() => {
                    localStorage.setItem(
                      'settingsPath',
                      JSON.stringify(settingAccordion.path.split('/settings/')[1])
                    );
                    history.push(settingAccordionPanelItem.path);
                  }}
                >
                  {settingAccordionPanelItem.label}
                </SettingsAccordionPanelItem>
              ))}
            </SettingsAccordionPanel>
          </SettingsAccordionItem>
        ))}
      </SettingsAccordion>
    </div>
  );
};

export default withRouter(SideMenu);
