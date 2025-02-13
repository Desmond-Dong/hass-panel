import React, { useState, useRef } from 'react';
import Icon from '@mdi/react';
import {
  mdiPlus,
  mdiDelete,
  mdiClockOutline,
  mdiWeatherPartlyCloudy,
  mdiLightbulbGroup,
  mdiThermometer,
  mdiPlayCircle,
  mdiRouterNetwork,
  mdiCctv,
  mdiCurtains,
  mdiWaterPump,
  mdiLightningBolt,
  mdiWhiteBalanceSunny,
  mdiServerNetwork,
  mdiScriptText,
  mdiCheck,
  mdiEye,
  // mdiEyeOff,
  mdiSnowflake,
  mdiExport,
  mdiImport,
  mdiMotionSensor,
  mdiHomeFloorG,
  mdiFileFind,
  mdiClose,

} from '@mdi/js';
import ConfigField from '../../components/ConfigField';
import AddCardModal from '../../components/AddCardModal';
// import Modal from '../../components/Modal';
import LightOverviewCard from '../../components/LightOverviewCard';
import WebdavConfig from '../../components/WebdavConfig';
import { message, Button, Space, Dropdown, Switch } from 'antd';
import { useLanguage } from '../../i18n/LanguageContext';
import { loadConfigFromWebDAV, saveConfigToWebDAV } from '../../utils/webdav.js';

import './style.css';
import VersionListModal from '../../components/VersionList';
import BottomInfo from '../../components/BottomInfo';
const getCardTypes = (t) => ({
  TimeCard: {
    name: t('cards.time'),
    icon: mdiClockOutline,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.time')
      },
      {
        key: 'timeFormat',
        label: t('fields.timeFormat'),
        type: 'text',
        default: 'HH:mm:ss'
      },
      {
        key: 'dateFormat',
        label: t('fields.dateFormat'),
        type: 'text',
        default: 'YYYY-MM-DD'
      }
    ]
  },
  WeatherCard: {
    name: t('cards.weather'),
    icon: mdiWeatherPartlyCloudy,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.weather')
      },
      {
        key: 'entity_id',
        label: t('fields.weatherEntity'),
        type: 'entity',
        filter: 'weather.*',
        default: ''
      }
    ]
  },
  LightStatusCard: {
    name: t('cards.light'),
    icon: mdiLightbulbGroup,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.lightStatus')
      },
      {
        key: 'lights',
        label: t('fields.lightsConfig'),
        type: 'lights-config',
        default: {}
      }
    ]
  },
  SensorCard: {
    name: t('cards.sensor'),
    icon: mdiThermometer,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.sensor')
      },
      {
        key: 'sensors',
        label: t('fields.sensorsConfig'),
        type: 'sensor-group',
        default: [
          {
            id: 'LIVING_ROOM',
            name: '客厅',
            sensors: {
              temperature: {
                entity_id: '',
                name: t('sensor.types.temperature'),
                icon: 'mdiThermometer'
              },
              humidity: {
                entity_id: '',
                name: t('sensor.types.humidity'),
                icon: 'mdiWaterPercent'
              }
            }
          }
        ]
      }
    ]
  },
  MediaPlayerCard: {
    name: t('cards.media'),
    icon: mdiPlayCircle,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.mediaplayer')
      },
      {
        key: 'mediaPlayers',
        label: t('fields.mediaPlayersConfig'),
        type: 'media-players',
        default: []
      }
    ]
  },
  RouterCard: {
    name: t('cards.router'),
    icon: mdiRouterNetwork,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.router')
      },
      {
        key: 'router',
        label: t('fields.routerConfig'),
        type: 'router-config',
        default: {}
      }
    ]
  },
  NASCard: {
    name: t('cards.nas'),
    icon: mdiServerNetwork,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.nas')
      },
      {
        key: 'syno_nas',
        label: t('fields.nasConfig'),
        type: 'nas-config',
        default: {}
      }
    ]
  },
  CameraCard: {
    name: t('cards.camera'),
    icon: mdiCctv,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.camera')
      },
      {
        key: 'cameras',
        label: t('fields.camerasConfig'),
        type: 'cameras-config',
        default: []
      }
    ]
  },
  CurtainCard: {
    name: t('cards.curtain'),
    icon: mdiCurtains,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.curtain')
      },
      {
        key: 'curtains',
        label: t('fields.curtainsConfig'),
        type: 'curtains-config',
        default: []
      }
    ]
  },
  ElectricityCard: {
    name: t('cards.electricity'),
    icon: mdiLightningBolt,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.electricity')
      },
      {
        key: 'electricity',
        label: t('fields.electricityConfig'),
        type: 'electricity-config',
        default: {}
      }
    ]
  },
  ScriptPanel: {
    name: t('cards.script'),
    icon: mdiScriptText,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.script')
      },
      {
        key: 'scripts',
        label: t('fields.scriptsConfig'),
        type: 'scripts-config',
        default: []
      }
    ]
  },
  WaterPurifierCard: {
    name: t('cards.water'),
    icon: mdiWaterPump,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.water')
      },
      {
        key: 'waterpuri',
        label: t('fields.waterConfig'),
        type: 'waterpuri-config',
        default: {}
      }
    ]
  },
  IlluminanceCard: {
    name: t('cards.illuminance'),
    icon: mdiWhiteBalanceSunny,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.illuminance')
      },
      {
        key: 'sensors',
        label: t('fields.illuminanceConfig'),
        type: 'illuminance-config',
        default: []
      }
    ]
  },
  ClimateCard: {
    name: t('cards.climate'),
    icon: mdiSnowflake,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.climate')
      },
      {
        key: 'entity_id',
        label: t('fields.climateEntity'),
        type: 'entity',
        filter: 'climate.*'
      },
      {
        key: 'name',
        label: t('fields.name'),
        type: 'text'
      },
      {
        key: 'features',
        label: t('fields.featuresConfig'),
        type: 'climate-features',
        default: {}
      }
    ]
  },
  MotionCard: {
    name: t('cards.motion'),
    icon: mdiMotionSensor,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.motion')
      },
      {
        key: 'motion_entity_id',
        label: t('fields.motionEntity'),
        type: 'entity',
        filter: 'event.*'
      },
      {
        key: 'lux_entity_id',
        label: t('fields.luxEntity'),
        type: 'entity',
        filter: 'sensor.*'
      }
    ]
  },
  LightOverviewCard: {
    name: t('cards.lightOverview'),
    icon: mdiHomeFloorG,
    fields: [
      {
        key: 'title',
        label: t('fields.title'),
        type: 'text',
        default: t('cardTitles.lightOverview')
      },
      {
        key: 'background',
        label: t('fields.background'),
        type: 'text',
        default: ''
      },
      {
        key: 'rooms',
        label: t('fields.roomsConfig'),
        type: 'light-overview-config',
        default: []
      }
    ]
  }
});


function ConfigPage() {
  const fileInputRef = useRef(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewConfig, setPreviewConfig] = useState(null);
  const [cards, setCards] = useState(() => {
    const savedConfig = localStorage.getItem('card-config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        return config.map(card => ({
          ...card,
          visible: card.visible !== false // 如果没有visible属性，默认为true
        }));
      } catch (error) {
        console.error('解析配置失败:', error);
        return [];
      }
    }
    return [];
  });
 
  const [showAddModal, setShowAddModal] = useState(false);
  const [webdavConfig, setWebdavConfig] = useState(() => {
    return JSON.parse(localStorage.getItem('webdav-config') || '{}');
  });
  const [showWebDAVModal, setShowWebDAVModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);

  const { t } = useLanguage();
  const cardTypes = getCardTypes(t);

  const handleSave = async () => {
    try {
      // 计算默认布局
      const defaultLayouts = calculateLayouts(cards);

      // 分别保存移动端和桌面端的默认布局
      localStorage.setItem('mobile-default-dashboard-layouts', JSON.stringify(defaultLayouts));
      localStorage.setItem('desktop-default-dashboard-layouts', JSON.stringify(defaultLayouts));

      // 保存到本地存储
      localStorage.setItem('card-config', JSON.stringify(cards));

      // 获取当前已有的移动端和桌面端布局
      const existingMobileLayouts = JSON.parse(localStorage.getItem('mobile-dashboard-layouts') || '{}');
      const existingDesktopLayouts = JSON.parse(localStorage.getItem('desktop-dashboard-layouts') || '{}');

      // 只为新添加的卡片计算布局
      const newCards = cards.filter(card => {
        // 检查所有布局中是否存在该卡片的布局
        const inMobileLayouts = !Object.values(existingMobileLayouts).some(layout =>
          Array.isArray(layout) && layout.some(item => item.i === card.id.toString())
        );
        const inDesktopLayouts = !Object.values(existingDesktopLayouts).some(layout =>
          Array.isArray(layout) && layout.some(item => item.i === card.id.toString())
        );
        return inMobileLayouts || inDesktopLayouts;
      });

      if (newCards.length > 0) {
        // 只为新卡片计算布局
        const newLayouts = calculateLayouts(newCards);

        // 合并移动端布局
        const mergedMobileLayouts = {
          lg: [...(Array.isArray(existingMobileLayouts.lg) ? existingMobileLayouts.lg : []), ...(newLayouts.lg || [])],
          md: [...(Array.isArray(existingMobileLayouts.md) ? existingMobileLayouts.md : []), ...(newLayouts.md || [])],
          sm: [...(Array.isArray(existingMobileLayouts.sm) ? existingMobileLayouts.sm : []), ...(newLayouts.sm || [])]
        };

        // 合并桌面端布局
        const mergedDesktopLayouts = {
          lg: [...(Array.isArray(existingDesktopLayouts.lg) ? existingDesktopLayouts.lg : []), ...(newLayouts.lg || [])],
          md: [...(Array.isArray(existingDesktopLayouts.md) ? existingDesktopLayouts.md : []), ...(newLayouts.md || [])],
          sm: [...(Array.isArray(existingDesktopLayouts.sm) ? existingDesktopLayouts.sm : []), ...(newLayouts.sm || [])]
        };

        // 移除已删除卡片的布局
        const currentCardIds = cards.map(card => card.id.toString());
        ['lg', 'md', 'sm'].forEach(breakpoint => {
          if (Array.isArray(mergedMobileLayouts[breakpoint])) {
            mergedMobileLayouts[breakpoint] = mergedMobileLayouts[breakpoint].filter(
              item => currentCardIds.includes(item.i)
            );
          }
          if (Array.isArray(mergedDesktopLayouts[breakpoint])) {
            mergedDesktopLayouts[breakpoint] = mergedDesktopLayouts[breakpoint].filter(
              item => currentCardIds.includes(item.i)
            );
          }
        });

        // 保存合并后的布局
        localStorage.setItem('mobile-dashboard-layouts', JSON.stringify(mergedMobileLayouts));
        localStorage.setItem('desktop-dashboard-layouts', JSON.stringify(mergedDesktopLayouts));
      }

      // 如果配置了WebDAV，且开启了自动同步，则保存到WebDAV
      if (webdavConfig.url && webdavConfig.autoSync) {
        try {
          await saveConfigToWebDAV(cards);
        } catch (error) {
          message.error(t('config.saveFailed') + ': ' + error.message);
        }
      }

      setHasUnsavedChanges(false);
      message.success(t('config.saveSuccess'));
    } catch (error) {
      console.error('保存配置失败:', error);
      message.error(t('config.saveFailed') + ': ' + error.message);
    }
  };

  // 处理卡片显示状态变化
  const handleVisibilityChange = (cardId) => {
    setCards(prevCards => {
      const newCards = prevCards.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            visible: card.visible === false ? true : false
          };
        }
        return card;
      });
      setHasUnsavedChanges(true);
      return newCards;
    });
  };
  // 处理卡片标题显示状态变化
  const handleTitleVisibilityChange = (cardId) => {
    setCards(prevCards => {
      const newCards = prevCards.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            titleVisible: card.titleVisible === false ? true : false
          };
        }
        return card;
      });
      setHasUnsavedChanges(true);
      return newCards;
    });
  };
  // 计算卡片布局
  const calculateLayouts = (cards) => {
    const layouts = {
      lg: [],
      md: [],
      sm: []
    };

    // 基础布局参数
    const baseParams = {
      lg: { cols: 3, cardWidth: 1 },
      md: { cols: 2, cardWidth: 1 },
      sm: { cols: 1, cardWidth: 1 }
    };

    // 添加卡片高度配置
    const cardHeights = {
      TimeCard: { lg: 10, md: 10, sm: 10 },
      WeatherCard: { lg: 20, md: 20, sm: 20 },
      LightStatusCard: { lg: 24, md: 24, sm: 24 },
      LightOverviewCard: { lg: 22, md: 22, sm: 22 },
      SensorCard: { lg: 16, md: 16, sm: 16 },
      RouterCard: { lg: 26, md: 26, sm: 26 },
      NASCard: { lg: 36, md: 36, sm: 36 },
      MediaPlayerCard: { lg: 30, md: 30, sm: 30 },
      CurtainCard: { lg: 30, md: 30, sm: 30 },
      ElectricityCard: { lg: 24, md: 24, sm: 24 },
      ScriptPanel: { lg: 14, md: 14, sm: 14 },
      WaterPurifierCard: { lg: 24, md: 24, sm: 24 },
      IlluminanceCard: { lg: 16, md: 16, sm: 16 },
      CameraCard: { lg: 20, md: 20, sm: 20 },
      ClimateCard: { lg: 28, md: 28, sm: 28 },
      MotionCard: { lg: 20, md: 20, sm: 20 }
    };

    // 计算每个卡片的位置
    cards.forEach((card, index) => {
      const height = cardHeights[card.type] || { lg: 10, md: 10, sm: 10 };

      // 计算每个响应式布局的位置
      Object.keys(layouts).forEach(breakpoint => {
        const { cols } = baseParams[breakpoint];
        const row = Math.floor(index / cols);
        const col = index % cols;

        layouts[breakpoint].push({
          'card_type': card.type,
          i: card.id.toString(),
          x: col,
          y: row * height[breakpoint],
          w: baseParams[breakpoint].cardWidth,
          h: height[breakpoint]
        });
      });
    });

    return layouts;
  };

  const handleAddCard = (type) => {
    const defaultConfig = cardTypes[type].fields.reduce((acc, field) => {
      if (field.type === 'sensor-group') {
        acc[field.key] = field.default || [];
      } else if (field.type.endsWith('-config')) {
        acc[field.key] = field.default || {};
      } else {
        acc[field.key] = field.default;
      }
      return acc;
    }, {});

    setCards([...cards, {
      id: Date.now(),
      type,
      config: defaultConfig,
      visible: true, // 新添加的卡片默认可见
      titleVisible: true // 新添加的卡片默认显示标题
    }]);

    setHasUnsavedChanges(true);
    setShowAddModal(false);
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
    setHasUnsavedChanges(true);
  };

  const handleConfigChange = (cardId, key, value) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const newConfig = { ...card.config, [key]: value };
        // 如果是 LightOverviewCard，更新预览配置
        if (card.type === 'LightOverviewCard') {
          setPreviewConfig(newConfig);
        }
        return { ...card, config: newConfig };
      }
      return card;
    }));
    setHasUnsavedChanges(true);
  };

  // 导出配置
  const handleExport = () => {
    const config = {
      cards,
      layouts: {
        mobile: JSON.parse(localStorage.getItem('mobile-dashboard-layouts') || '{}'),
        desktop: JSON.parse(localStorage.getItem('desktop-dashboard-layouts') || '{}')
      },
      defaultLayouts: {
        mobile: JSON.parse(localStorage.getItem('mobile-default-dashboard-layouts') || '{}'),
        desktop: JSON.parse(localStorage.getItem('desktop-default-dashboard-layouts') || '{}')
      }
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hass-panel-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 修改导入配置的处理函数
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);

          // 更新卡片配置
          setCards(config.cards.map(card => ({
            ...card,
            visible: card.visible !== false, // 确保所有卡片都有visible属性
            titleVisible: card.titleVisible !== false // 确保所有卡片都有titleVisible属性
          })));

          // 更新布局配置
          if (config.layouts) {
            // 分别保存移动端和桌面端布局
            localStorage.setItem('mobile-dashboard-layouts', config.layouts);
            localStorage.setItem('desktop-dashboard-layouts', config.layouts);
          }
          if (config.defaultLayouts) {
            // 分别保存移动端和桌面端默认布局
            localStorage.setItem('mobile-default-dashboard-layouts', config.defaultLayouts);
            localStorage.setItem('desktop-default-dashboard-layouts', config.defaultLayouts);
          }

          setHasUnsavedChanges(true);
        } catch (error) {
          console.error('解析配置文件失败:', error);
          message.error('配置文件格式错误，请检查文件内容');
        }
      };
      reader.readAsText(file);
    }
  };



  // 修改 WebDAV 相关函数
  const handleWebDAVSubmit = async (values) => {
    try {
      setWebdavConfig(values);
      localStorage.setItem('webdav-config', JSON.stringify(values));
      setShowWebDAVModal(false);
    } catch (error) {
      message.error(`${t('webdav.configFailed')}: ${error.message}`);
    }
  };

  // 配置导入导出菜单项
  const configMenuItems = [
    {
      key: 'import',
      label: t('config.import'),
      icon: <Icon path={mdiImport} size={0.8} />,
      onClick: () => fileInputRef.current.click()
    },
    {
      key: 'export',
      label: t('config.export'),
      icon: <Icon path={mdiExport} size={0.8} />,
      onClick: handleExport
    }
  ];

  // WebDAV同步菜单项
  const webdavMenuItems = webdavConfig.url ? [
    {
      key: 'config',
      label: t('webdav.config'),
      icon: <Icon path={mdiServerNetwork} size={0.8} />,
      onClick: () => setShowWebDAVModal(true)
    },
    {
      type: 'divider'
    },
    {
      key: 'push',
      label: t('webdav.syncTo'),
      icon: <Icon path={mdiExport} size={0.8} />,
      onClick: () => saveConfigToWebDAV(cards)
    },
    {
      key: 'pull',
      label: t('webdav.syncFrom'),
      icon: <Icon path={mdiImport} size={0.8} />,
      onClick: async () => {
        try {
          const configData = await loadConfigFromWebDAV();
          setCards(configData.cards.map(card => ({
            ...card,
            visible: card.visible !== false,
            titleVisible: card.titleVisible !== false
          })));
          setHasUnsavedChanges(true);
          message.success('从WebDAV加载配置成功');
        } catch (error) {
          message.error('从WebDAV加载配置失败: ' + error.message);
        }
      }
    },
    {
      key: 'versions',
      label: t('webdav.versionList'),
      icon: <Icon path={mdiFileFind} size={0.8} />,
      onClick: async () => {
        setShowVersionModal(true);
      }
    }
  ] : [
    {
      key: 'config',
      label: t('webdav.config'),
      icon: <Icon path={mdiServerNetwork} size={0.8} />,
      onClick: () => setShowWebDAVModal(true)
    }
  ];

  return (
    <div className="config-page">
      <div className="config-header">
        <Space className="header-buttons">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            style={{ display: 'none' }}
          />

          {/* 配置导入导出下拉菜单 */}
          <Dropdown menu={{ items: configMenuItems }} placement="bottomLeft">
            <Button>
              {t('config.title')}
              <Icon path={mdiImport} size={0.8} style={{ marginLeft: 8 }} />
            </Button>
          </Dropdown>

          {/* WebDAV相关操作下拉菜单 */}
          <Dropdown menu={{ items: webdavMenuItems }} placement="bottomLeft">
            <Button>
              WebDAV
              <Icon path={mdiServerNetwork} size={0.8} style={{ marginLeft: 8 }} />
            </Button>
          </Dropdown>

        </Space>
      </div>

      <div className="config-list">
        {cards.map(card => (
          <div key={card.id} className="config-item">
            <div className="item-header">
              <div className="item-title">
                <Icon path={cardTypes[card.type].icon} size={1} />
                <span>{cardTypes[card.type].name}</span>
              </div>
              <div className="item-actions">
                <Switch
                  type="link"
                  style={{ color: 'var(--color-primary)', backgroundColor: card.titleVisible ? 'var(--color-primary)' : '' }}
                  defaultChecked={card.titleVisible}
                  onChange={() => handleTitleVisibilityChange(card.id)}
                  checkedChildren={t('config.showTitle')}
                  unCheckedChildren={t('config.hideTitle')}
                >

                </Switch>

                <Switch
                  type="link"
                  style={{ color: 'var(--color-primary)', backgroundColor: card.visible ? 'var(--color-primary)' : '' }}
                  defaultChecked={card.visible}
                  onChange={() => handleVisibilityChange(card.id)}
                  checkedChildren={t('config.showCard')}
                  unCheckedChildren={t('config.hideCard')}
                >

                </Switch>
                {card.type === 'LightOverviewCard' && (
                  <button
                    className="preview-button"
                    onClick={() => {
                      setPreviewConfig(card.config);
                      setShowPreview(true);
                    }}
                    title={t('config.preview')}
                  >
                    <Icon path={mdiEye} size={1} />

                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Icon path={mdiDelete} size={1} />
                </button>
              </div>
            </div>
            <div className="item-content">
              {cardTypes[card.type].fields.map(field => (
                <ConfigField
                  key={field.key}
                  field={field}
                  value={card.config[field.key]}
                  onChange={(value) => handleConfigChange(card.id, field.key, value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddCardModal
          onClose={() => setShowAddModal(false)}
          onSelect={handleAddCard}
          cardTypes={getCardTypes(t)}
        />
      )}

      {previewConfig && (
        <div className={`preview-container ${showPreview ? 'visible' : ''}`}>
          <button
            className="close-preview"
            onClick={() => setShowPreview(false)}
          >
            <Icon path={mdiClose} size={1} />
          </button>
          <LightOverviewCard
            key={JSON.stringify(previewConfig)}
            config={previewConfig}
          />
        </div>
      )}

      <WebdavConfig
        visible={showWebDAVModal}
        onCancel={() => setShowWebDAVModal(false)}
        onSubmit={handleWebDAVSubmit}
        initialValues={webdavConfig}
      />

      <VersionListModal
        visible={showVersionModal}
        onCancel={() => setShowVersionModal(false)}
        setCards={setCards}
        setHasUnsavedChanges={setHasUnsavedChanges}
        setShowVersionModal={setShowVersionModal}
      />

      {/* 保存按钮 */}
      <button
        className={`save-button ${hasUnsavedChanges ? 'has-changes' : ''}`}
        onClick={handleSave}

      >
        <Icon path={mdiCheck} size={2} />
      </button>

      {/* 添加卡片按钮 */}
      <button
        className="add-card-button"
        onClick={() => setShowAddModal(true)}
      >
        <Icon path={mdiPlus} size={3} />
      </button>
      
      <BottomInfo />
    </div>
  );
}

export default ConfigPage; 