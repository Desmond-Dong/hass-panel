import React, { useState, useEffect } from 'react';
// import { PullToRefresh } from 'antd-mobile';
import Icon from '@mdi/react';
import { 
  mdiWeatherNight,
  mdiWhiteBalanceSunny,
  mdiCheck,
  mdiPencil,
  mdiRefresh,
  mdiViewColumn,
  mdiMenu,
  mdiViewDashboard,
} from '@mdi/js';
import { useTheme } from '../../theme/ThemeContext';
import { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { message } from 'antd';
import WeatherCard from '../../components/WeatherCard';
import SensorCard from '../../components/SensorCard';
import TimeCard from '../../components/TimeCard';
import MediaPlayerCard from '../../components/MediaPlayerCard';
import LightOverviewCard from '../../components/LightOverviewCard';
import LightStatusCard from '../../components/LightStatusCard';
import CameraSection from '../../components/CameraSection';
import CurtainCard from '../../components/CurtainCard';
import ElectricityCard from '../../components/ElectricityCard';
import ClimateCard from '../../components/ClimateCard';
import RouterCard from '../../components/RouterCard';
import NASCard from '../../components/NASCard';
import ScriptPanel from '../../components/ScriptPanel';
import WaterPurifierCard from '../../components/WaterPurifierCard';
import IlluminanceCard from '../../components/IlluminanceCard';
import MotionCard from '../../components/MotionCard';
import './style.css';

// 获取当前断点
const getCurrentBreakpoint = (width) => {
  if (width >= 1200) return 'lg';
  if (width >= 768) return 'md';
  return 'sm';
};

// 获取列布局图标
const getColumnLayoutIcon = (columns) => {
  return mdiViewColumn;
};


function Home({ sidebarVisible, setSidebarVisible }) {
  const { theme, toggleTheme } = useTheme();
  const [cards] = useState(() => {
    // 从 localStorage 读取配置
    const savedConfig = localStorage.getItem('card-config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        return config.map(card => ({
          ...card,
          visible: card.visible !== false // 确保所有卡片都有visible属性
        }));
      } catch (error) {
        console.error('解析配置失败:', error);
        return [];
      }
    }
    return [];
  });

  // const handleRefresh = () => {
  //   console.log('Refresh triggered');
  //   window.location.reload();
  // };

  // 修改布局状态
  const [currentLayouts, setCurrentLayouts] = useState(() => {
    try {
      // 判断是否为移动设备
      const isMobileDevice = window.innerWidth < 768;
      const layoutKey = isMobileDevice ? 'mobile-dashboard-layouts' : 'desktop-dashboard-layouts';
      const defaultLayoutKey = isMobileDevice ? 'mobile-default-dashboard-layouts' : 'desktop-default-dashboard-layouts';
      
      const savedLayouts = localStorage.getItem(layoutKey);
      const defaultLayouts = localStorage.getItem(defaultLayoutKey);
      
      // 处理已保存的布局
      if (savedLayouts) {
        // 如果是字符串格式
        if (typeof savedLayouts === 'string') {
          // 如果是JSON字符串，则解析
          if (savedLayouts.startsWith('{')) {
            return JSON.parse(savedLayouts);
          }
          // 如果是旧版本的字符串格式，直接返回
          return savedLayouts;
        }
        // 如果已经是对象格式，直接返回
        return savedLayouts;
      }
      
      // 处理默认布局
      if (defaultLayouts) {
        // 如果是字符串格式
        if (typeof defaultLayouts === 'string') {
          // 如果是JSON字符串，则解析
          if (defaultLayouts.startsWith('{')) {
            return JSON.parse(defaultLayouts);
          }
          // 如果是旧版本的字符串格式，直接返回
          return defaultLayouts;
        }
        // 如果已经是对象格式，直接返回
        return defaultLayouts;
      }
      
      return {};
    } catch (error) {
      console.error('解析布局配置失败:', error);
      return {};
    }
  });

  // 处理布局变化
  const handleLayoutChange = (layout, layouts) => {
    setCurrentLayouts(layouts);
    // 根据设备类型选择存储键名
    const layoutKey = isMobile ? 'mobile-dashboard-layouts' : 'desktop-dashboard-layouts';
    // 保存布局数据
    localStorage.setItem(layoutKey, JSON.stringify(layouts));
  };

  // 修改重置布局功能
  const handleResetLayout = () => {
    try {
      // 根据设备类型选择默认布局键名
      const defaultLayoutKey = isMobile ? 'mobile-default-dashboard-layouts' : 'desktop-default-dashboard-layouts';
      const defaultLayouts = localStorage.getItem(defaultLayoutKey);
      
      if (defaultLayouts) {
        // 处理默认布局数据
        let layouts;
        if (typeof defaultLayouts === 'string') {
          // 如果是JSON字符串，则解析
          if (defaultLayouts.startsWith('{')) {
            layouts = JSON.parse(defaultLayouts);
          } else {
            // 如果是旧版本的字符串格式，直接使用
            layouts = defaultLayouts;
          }
        } else {
          // 如果已经是对象格式，直接使用
          layouts = defaultLayouts;
        }
        
        setCurrentLayouts(layouts);
        // 根据设备类型选择存储键名
        const layoutKey = isMobile ? 'mobile-dashboard-layouts' : 'desktop-dashboard-layouts';
        localStorage.setItem(layoutKey, JSON.stringify(layouts));
      }
      setIsEditing(false);
    } catch (error) {
      console.error('重置布局失败:', error);
      message.error('重置布局失败');
    }
  };

  // 添加宽度状态
  const [width, setWidth] = useState(window.innerWidth);
  // 添加移动端检测
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 监听窗口大小变化
  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth < 768;
      // 根据侧边栏状态动态计算宽度
      const sidebarWidth = isMobile ? 0 : (sidebarVisible ? 200 : 0);
      const containerPadding = isMobile ? 32 : 40;
      const availableWidth = window.innerWidth - sidebarWidth - containerPadding;
      setWidth(availableWidth);
      
      // 获取保存的列数设置
      const savedColumns = localStorage.getItem('dashboard-columns');
      const currentColumns = savedColumns ? JSON.parse(savedColumns) : { lg: 3, md: 3, sm: 1 };
      
      if (isMobile) {
        // 移动端强制使用1列
        const newColumnCount = { ...currentColumns, lg: 1, md: 1, sm: 1 };
        setColumnCount(newColumnCount);
        localStorage.setItem('dashboard-columns', JSON.stringify(newColumnCount));
      } else if (!savedColumns) {
        // 非移动端且没有保存的设置时，使用默认值
        setColumnCount({ lg: 3, md: 3, sm: 1 });
        localStorage.setItem('dashboard-columns', JSON.stringify({ lg: 3, md: 3, sm: 1 }));
      } else {
        // 非移动端且有保存的设置时，使用保存的值
        setColumnCount(currentColumns);
      }
      
      setIsMobile(isMobile);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarVisible]); // 添加 sidebarVisible 作为依赖

  // 添加拖拽状态
  const [isDragging, setIsDragging] = useState(false);

  // 处理触摸事件
  useEffect(() => {
    if (isMobile) {
      const preventScroll = (e) => {
        if (isDragging) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', preventScroll, { passive: false });
      return () => document.removeEventListener('touchmove', preventScroll);
    }
  }, [isMobile, isDragging]);

  const [isEditing, setIsEditing] = useState(false);

  // 添加列数状态
  const [columnCount, setColumnCount] = useState(() => {
    const savedColumns = localStorage.getItem('dashboard-columns');
    return savedColumns ? JSON.parse(savedColumns) : { lg: 4, md: 3, sm: 1 };
  });

  // 处理列数变化
  const handleColumnsChange = (breakpoint) => {
    if (isMobile) {
      return;
    }
    const newColumnCount = {
      ...columnCount,
      [breakpoint]: columnCount[breakpoint] >= 5 ? 3 : columnCount[breakpoint] + 1
    };
    setColumnCount(newColumnCount);
    localStorage.setItem('dashboard-columns', JSON.stringify(newColumnCount));
  };

  const renderCard = (card) => {
    switch (card.type) {
      case 'TimeCard':
        return <TimeCard {...card.config} />;
      case 'WeatherCard':
        return <WeatherCard entityId={card.config.entity_id} />;
      case 'LightStatusCard':
        return <LightStatusCard config={card.config} />;
      case 'SensorCard':
        return <SensorCard config={card.config} />;
      case 'MediaPlayerCard':
        return <MediaPlayerCard config={card.config} />;
      case 'CurtainCard':
        return <CurtainCard config={card.config} />;
      case 'ElectricityCard':
        return <ElectricityCard config={card.config} />;
      case 'ScriptPanel':
        return <ScriptPanel config={card.config} />;
      case 'WaterPurifierCard':
        return <WaterPurifierCard config={card.config} />;
      case 'IlluminanceCard':
        return <IlluminanceCard config={card.config} />;
      case 'RouterCard':
        return <RouterCard config={card.config} />;
      case 'NASCard':
        return <NASCard config={card.config} />;
      case 'CameraCard':
        return <CameraSection config={card.config} />;
      case 'ClimateCard':
        return <ClimateCard config={card.config} />;
      case 'MotionCard':
        return <MotionCard config={card.config} />;
      case 'LightOverviewCard':
        return <LightOverviewCard config={card.config} />;
      default:
        return null;
    }
  };


  return (
    <div className={`page-container ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
      {/* <PullToRefresh
        onRefresh={handleRefresh}
        pullingText="下拉刷新"
        canReleaseText="释放立即刷新"
        refreshingText="刷新中..."
        completeText="刷新完成"
      > */}
        <div className="content">
          <div className="header">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            >
              <Icon
                path={theme === 'light' ? mdiWeatherNight : mdiWhiteBalanceSunny}
                size={1}
                color="var(--color-text-primary)"
              />
            </button>

            {!isEditing && (
              <button 
                className="edit-toggle"
                onClick={() => setIsEditing(true)}
                title="编辑布局"
              >
                <Icon
                  path={mdiPencil}
                  size={1}
                  color="var(--color-text-primary)"
                />
              </button>
            )}
            {isEditing && (
              <button 
                className="reset-layout"
                onClick={() => handleResetLayout()}
                title="重置布局"
              >
                <Icon
                  path={mdiRefresh}
                  size={1}
                  color="var(--color-text-primary)"
                />
              </button>
            )}
            {isEditing && !isMobile && (
              <button 
                className={`pc-edit-toggle ${isEditing ? 'active' : ''}`}
                onClick={() => setIsEditing(false)}
                
                title="完成编辑"
              >
                <Icon
                  path={mdiCheck}
                  size={1}
                  color="var(--color-text-primary)"
                />
              </button>
            )}
          {!isMobile && (
            <button 
              className="column-adjust"
              onClick={() => handleColumnsChange(getCurrentBreakpoint(width))}
              title={`当前 ${columnCount[getCurrentBreakpoint(width)]} 列，点击切换`}
            >
              <Icon
                path={getColumnLayoutIcon(columnCount[getCurrentBreakpoint(width)])}
                size={1}
                color="var(--color-text-primary)"
              />
              <span className="column-count">
                  {columnCount[getCurrentBreakpoint(width)]}
                </span>
              </button>
            )}

            {!isMobile && (
              <button 
                className="sidebar-toggle"
                onClick={() => setSidebarVisible(!sidebarVisible)}
                title={sidebarVisible ? '隐藏侧边栏' : '显示侧边栏'}
            >
              <Icon
                path={mdiMenu}
                size={1}
                color="var(--color-text-primary)"
              />
              </button>
            )}

            
            
          </div>
          
          

          <Responsive
            className={`layout ${isEditing ? 'editing' : ''}`}
            layouts={currentLayouts}
            breakpoints={{ lg: 1200, md: 768, sm: 480 }}
            cols={columnCount}
            rowHeight={5}
            width={width}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            isDraggable={isEditing}
            isResizable={isEditing}
            draggableHandle={isMobile ? ".card-header" : undefined}
            onDragStart={() => setIsDragging(true)}
            onDragStop={() => setIsDragging(false)}
            resizeHandles={['se']}
            useCSSTransforms={true}
            compactType="vertical"
            preventCollision={false}
            onLayoutChange={handleLayoutChange}
            resizeHandleWrapperClass="resize-handle-wrapper"
          >
            {cards
              .filter(card => card.visible !== false)
              .map(card => (
                <div key={card.id}>
                  {renderCard(card)}
                </div>
              ))}
          </Responsive>

          {cards.filter(card => card.visible !== false).length === 0 && (
            <div className="empty-state">
              <Icon path={mdiViewDashboard} size={3} color="var(--color-text-secondary)" />
              <h2>还没有添加任何卡片</h2>
              <p>点击左侧配置按钮，前往配置页面添加卡片吧</p>
            </div>
          )}

          {isEditing && isMobile && (
            <button 
              className="edit-toggle active"
              onClick={() => setIsEditing(false)}
              title="完成编辑"
            >
              <Icon
                path={mdiCheck}
                size={1.2}
              />
            </button>
          )}
        </div>
      {/* </PullToRefresh> */}
    </div>
  );
}

export default Home;