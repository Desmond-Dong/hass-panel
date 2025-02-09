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
  mdiEyeOff,
  mdiSnowflake,
  mdiExport,
  mdiImport,
  mdiMotionSensor,
  mdiHomeFloorG,
  mdiFileFind,
  mdiClose,
  mdiInformationOutline
} from '@mdi/js';
import ConfigField from '../../components/ConfigField';
import AddCardModal from '../../components/AddCardModal';
// import Modal from '../../components/Modal';
import LightOverviewCard from '../../components/LightOverviewCard';

import './style.css';

const CARD_TYPES = {
  TimeCard: {
    name: '时间卡片',
    icon: mdiClockOutline,
    fields: [
      {
        key: 'timeFormat',
        label: '时间格式',
        type: 'text',
        default: 'HH:mm:ss'
      },
      {
        key: 'dateFormat',
        label: '日期格式',
        type: 'text',
        default: 'YYYY年MM月DD日'
      }
    ]
  },
  WeatherCard: {
    name: '天气卡片',
    icon: mdiWeatherPartlyCloudy,
    fields: [
      {
        key: 'entity_id',
        label: '天气实体',
        type: 'entity',
        filter: 'weather.*',
        default: 'weather.wo_de_jia'
      }
    ]
  },
  LightStatusCard: {
    name: '灯光状态',
    icon: mdiLightbulbGroup,
    fields: [
      {
        key: 'lights',
        label: '灯光配置',
        type: 'lights-config',
        default: {}
      }
    ]
  },
  SensorCard: {
    name: '传感器卡片',
    icon: mdiThermometer,
    fields: [
      {
        key: 'sensors',
        label: '传感器配置',
        type: 'sensor-group',
        default: [
          {
            id: 'LIVING_ROOM',
            name: '客厅',
            sensors: {
              temperature: {
                entity_id: '',
                name: '温度',
                icon: 'mdiThermometer'
              },
              humidity: {
                entity_id: '',
                name: '湿度',
                icon: 'mdiWaterPercent'
              }
            }
          }
        ]
      }
    ]
  },
  MediaPlayerCard: {
    name: '媒体播放器',
    icon: mdiPlayCircle,
    fields: [
      {
        key: 'mediaPlayers',
        label: '播放器配置',
        type: 'media-players',
        default: []
      }
    ]
  },
  RouterCard: {
    name: '路由监控',
    icon: mdiRouterNetwork,
    fields: [
      {
        key: 'router',
        label: '路由器配置',
        type: 'router-config',
        default: {}
      }
    ]
  },
  NASCard: {
    name: 'NAS监控',
    icon: mdiServerNetwork,
    fields: [
      {
        key: 'syno_nas',
        label: 'NAS配置',
        type: 'nas-config',
        default: {}
      }
    ]
  },
  CameraCard: {
    name: '监控画面',
    icon: mdiCctv,
    fields: [
      {
        key: 'cameras',
        label: '摄像头配置',
        type: 'cameras-config',
        default: []
      }
    ]
  },
  CurtainCard: {
    name: '窗帘控制',
    icon: mdiCurtains,
    fields: [
      {
        key: 'curtains',
        label: '窗帘配置',
        type: 'curtains-config',
        default: []
      }
    ]
  },
  ElectricityCard: {
    name: '电量监控',
    icon: mdiLightningBolt,
    fields: [
      {
        key: 'electricity',
        label: '电量配置',
        type: 'electricity-config',
        default: {}
      }
    ]
  },
  ScriptPanel: {
    name: '快捷指令',
    icon: mdiScriptText,
    fields: [
      {
        key: 'scripts',
        label: '指令配置',
        type: 'scripts-config',
        default: []
      }
    ]
  },
  WaterPurifierCard: {
    name: '净水器',
    icon: mdiWaterPump,
    fields: [
      {
        key: 'waterpuri',
        label: '净水器配置',
        type: 'waterpuri-config',
        default: {}
      }
    ]
  },
  IlluminanceCard: {
    name: '光照传感器',
    icon: mdiWhiteBalanceSunny,
    fields: [
      {
        key: 'sensors',
        label: '光照传感器配置',
        type: 'illuminance-config',
        default: []
      }
    ]
  },
  ClimateCard: {
    name: '空调控制',
    icon: mdiSnowflake,
    fields: [
      {
        key: 'entity_id',
        label: '空调实体',
        type: 'entity',
        filter: 'climate.*'
      },
      {
        key: 'name',
        label: '名称',
        type: 'text'
      },
      {
        key: 'features',
        label: '功能配置',
        type: 'climate-features',
        default: {}
      }
    ]
  },
  MotionCard: {
    name: '人体传感器',
    icon: mdiMotionSensor,
    fields: [
      {
        key: 'title',
        label: '标题',
        type: 'text',
        default: '人体传感器'
      },
      {
        key: 'motion_entity_id',
        label: '人体传感器实体',
        type: 'entity',
        filter: 'event.*'
      },
      {
        key: 'lux_entity_id',
        label: '光照传感器实体',
        type: 'entity',
        filter: 'sensor.*'
      }
    ]
  },
  LightOverviewCard: {
    name: '房间灯光概览',
    icon: mdiHomeFloorG,
    fields: [
      {
        key: 'background',
        label: '背景图片',
        type: 'text',
        default: ''
      },
      {
        key: 'rooms',
        label: '房间灯光配置',
        type: 'light-overview-config',
        default: []
      }
    ]
  }
};

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
  const [versionInfo, setVersionInfo] = useState(null);
  
  const handleSave = () => {
    // 保存卡片配置
    localStorage.setItem('card-config', JSON.stringify(cards));

    // 获取当前已有的布局
    const existingLayouts = JSON.parse(localStorage.getItem('dashboard-layouts') || '{}');
    
    // 只为新添加的卡片计算布局
    const newCards = cards.filter(card => {
      // 检查所有布局中是否存在该卡片的布局
      return !Object.values(existingLayouts).some(layout => 
        layout.some(item => item.i === card.id.toString())
      );
    });

    if (newCards.length > 0) {
      // 只为新卡片计算布局
      const newLayouts = calculateLayouts(newCards);
      
      // 合并布局，保留已有卡片的布局
      const mergedLayouts = {
        lg: [...(existingLayouts.lg || []), ...(newLayouts.lg || [])],
        md: [...(existingLayouts.md || []), ...(newLayouts.md || [])],
        sm: [...(existingLayouts.sm || []), ...(newLayouts.sm || [])]
      };

      // 移除已删除卡片的布局
      const currentCardIds = cards.map(card => card.id.toString());
      Object.keys(mergedLayouts).forEach(breakpoint => {
        mergedLayouts[breakpoint] = mergedLayouts[breakpoint].filter(
          item => currentCardIds.includes(item.i)
        );
      });

      // 保存合并后的布局
      localStorage.setItem('dashboard-layouts', JSON.stringify(mergedLayouts));
    }
    
    setHasUnsavedChanges(false);
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

    // 卡片高度配置
    const cardHeights = {
      TimeCard: { lg: 5, md: 5, sm: 5 },
      WeatherCard: { lg: 9, md: 9, sm: 9 },
      LightStatusCard: { lg: 12, md: 12, sm: 12 },
      LightOverviewCard: { lg: 11, md: 11, sm: 11 },
      SensorCard: { lg: 8, md: 8, sm: 8 },
      RouterCard: { lg: 13, md: 13, sm: 13 },
      NASCard: { lg: 18, md: 18, sm: 18 },
      MediaPlayerCard: { lg: 14, md: 14, sm: 14 },
      CurtainCard: { lg: 14, md: 14, sm: 14 },
      ElectricityCard: { lg: 12, md: 12, sm: 12 },
      ScriptPanel: { lg: 7, md: 7, sm: 7 },
      WaterPurifierCard: { lg: 12, md: 12, sm: 12 },
      IlluminanceCard: { lg: 8, md: 8, sm: 8 },
      CameraCard: { lg: 10, md: 10, sm: 10 },
      ClimateCard: { lg: 12, md: 12, sm: 12 },
      MotionCard: { lg: 8, md: 8, sm: 8 }
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
    const defaultConfig = CARD_TYPES[type].fields.reduce((acc, field) => {
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
      visible: true // 新添加的卡片默认可见
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
        const newConfig = {...card.config, [key]: value};
        // 如果是 LightOverviewCard，更新预览配置
        if (card.type === 'LightOverviewCard') {
          setPreviewConfig(newConfig);
        }
        return {...card, config: newConfig};
      }
      return card;
    }));
    setHasUnsavedChanges(true);
  };

  // 导出配置
  const handleExport = () => {
    const config = {
      cards,
      layouts: localStorage.getItem('dashboard-layouts'),
      defaultLayouts: localStorage.getItem('default-dashboard-layouts')
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

  // 导入配置
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
            visible: card.visible !== false // 确保所有卡片都有visible属性
          })));
          
          // 更新布局配置
          if (config.layouts) {
            localStorage.setItem('dashboard-layouts', config.layouts);
          }
          if (config.defaultLayouts) {
            localStorage.setItem('default-dashboard-layouts', config.defaultLayouts);
          }
          
          setHasUnsavedChanges(true);
        } catch (error) {
          console.error('解析配置文件失败:', error);
          alert('配置文件格式错误，请检查文件内容');
        }
      };
      reader.readAsText(file);
    }
  };

  // 添加获取版本信息的函数
  React.useEffect(() => {
    fetch('/version.json')
      .then(response => response.json())
      .then(data => {
        setVersionInfo(data);
      })
      .catch(error => {
        console.error('获取版本信息失败:', error);
      });
  }, []);

  return (
    <div className="config-page">
      <div className="config-header">
        <div className="header-left">
          <h2>卡片配置</h2>
          {versionInfo && (
            <div className="version-info">
              <Icon path={mdiInformationOutline} size={0.8} />
              <span>前端版本: {versionInfo.version}</span>
            </div>
          )}
        </div>
        <div className="header-buttons">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            style={{ display: 'none' }}
          />
          <button className="import-button" onClick={() => fileInputRef.current.click()}>
            <Icon path={mdiImport} size={1} />
            导入配置
          </button>
          <button className="export-button" onClick={handleExport}>
            <Icon path={mdiExport} size={1} />
            导出配置
          </button>
          <button 
            className={`save-button ${hasUnsavedChanges ? 'has-changes' : ''}`}
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            <Icon path={mdiCheck} size={1} />
          </button>
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            <Icon path={mdiPlus} size={1} />
            添加卡片
          </button>
        </div>
      </div>
      
      <div className="config-list">
        {cards.map(card => (
          <div key={card.id} className="config-item">
            <div className="item-header">
              <div className="item-title">
                <Icon path={CARD_TYPES[card.type].icon} size={1} />
                <span>{CARD_TYPES[card.type].name}</span>
              </div>
              <div className="item-actions">
                {card.type === 'LightOverviewCard' && (
                  <button 
                    className="preview-button"
                    onClick={() => {
                      setPreviewConfig(card.config);
                      setShowPreview(true);
                    }}
                    title="预览效果"
                  >
                    <Icon path={mdiFileFind} size={1} />
                    
                  </button>
                )}
                <button 
                  className={`visibility-toggle `}
                  onClick={() => handleVisibilityChange(card.id)}
                  title={card.visible === false ? '显示卡片' : '隐藏卡片'}
                >
                  <Icon path={card.visible === false ? mdiEye : mdiEyeOff} size={1} />
                  
                </button>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Icon path={mdiDelete} size={1} />
                </button>
              </div>
            </div>
            <div className="item-content">
              {CARD_TYPES[card.type].fields.map(field => (
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
          cardTypes={CARD_TYPES}
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
    </div>
  );
}

export default ConfigPage; 