// 这是一个示例配置文件，用户可以参考此文件创建自己的配置

export const defaultConfig = {
    "weather": [
        "weather.wo_de_jia"
    ],
    "lights": {
        "living_room": {
            "entity_id": "light.opple_cn_243674416_bydceiling_s_2",
            "name": "客厅灯",
            "room": "living_room"
        },
        "master_bedroom": {
            "entity_id": "switch.lumi_cn_lumi_158d00041e902e_aq1_on_p_2_1",
            "name": "主卧灯",
            "room": "master_bedroom"
        },
        "second_bedroom": {
            "entity_id": "switch.lumi_cn_lumi_158d00041e92fb_aq1_on_p_2_1",
            "name": "次卧灯",
            "room": "second_bedroom"
        },
        "study_room": {
            "entity_id": "switch.lumi_cn_lumi_158d000423c91c_aq1_on_p_2_1",
            "name": "书房灯",
            "room": "study_room"
        },
        "kitchen": {
            "entity_id": "switch.lumi_cn_lumi_158d00031186e1_aq1_on_p_2_1",
            "name": "厨房灯",
            "room": "kitchen"
        },
        "bathroom": {
            "entity_id": "light.yeelink_cn_126748413_v1_s_2",
            "name": "卫生间灯",
            "room": "bathroom"
        },
        "balcony": {
            "entity_id": "light.yeelink_cn_396777994_lamp22_s_2",
            "name": "阳台灯",
            "room": "balcony"
        },
        "bathroom_entrance": {
            "entity_id": "switch.lumi_cn_lumi_158d0003144332_aq1_on_p_2_1",
            "name": "卫生间门口灯",
            "room": "bathroom"
        },
        "corridor": {
            "entity_id": "switch.lumi_cn_lumi_158d00041e8fd9_aq1_on_p_2_1",
            "name": "客厅走廊灯",
            "room": "corridor"
        }
    },
    "lightsOverview": {
        "background": "/static/media/关灯背景.8af387d0b90f11c3dd9c.webp",
        "rooms": [
            {
                "entity_id": "light.opple_cn_243674416_bydceiling_s_2",
                "name": "客厅灯",
                "room": "living_room",
                "position": {
                    "top": "70%",
                    "left": "44%"
                },
                "image": "/static/media/客厅.3a0bb6bc22472fa27a74.webp"
            },
            {
                "entity_id": "switch.lumi_cn_lumi_158d00041e8fd9_aq1_on_p_2_1",
                "name": "客厅走廊灯",
                "room": "corridor",
                "position": {
                    "top": "45%",
                    "left": "44%"
                },
                "image": "/static/media/客厅走廊.5eac5b257770ff4bfeb6.webp"
            },
            {
                "entity_id": "switch.lumi_cn_lumi_158d00041e902e_aq1_on_p_2_1",
                "name": "主卧灯",
                "room": "master_bedroom",
                "position": {
                    "top": "70%",
                    "left": "69%"
                },
                "image": "/static/media/主卧.90cde611d55a7a86a7f9.webp"
            },
            {
                "entity_id": "switch.lumi_cn_lumi_158d00041e92fb_aq1_on_p_2_1",
                "name": "次卧灯",
                "room": "second_bedroom",
                "position": {
                    "top": "23%",
                    "left": "61%"
                },
                "image": "/static/media/次卧.b8ae22656e9e80396606.webp"
            },
            {
                "entity_id": "switch.lumi_cn_lumi_158d000423c91c_aq1_on_p_2_1",
                "name": "书房灯",
                "room": "study_room",
                "position": {
                    "top": "23%",
                    "left": "29%"
                },
                "image": "/static/media/书房.7effeea924ab84addb0c.webp"
            },
            {
                "entity_id": "switch.lumi_cn_lumi_158d00031186e1_aq1_on_p_2_1",
                "name": "厨房灯",
                "room": "kitchen",
                "position": {
                    "top": "23%",
                    "left": "44%"
                },
                "image": "/static/media/厨房.e57a3bfcdcf083ca2387.webp"
            },
            {
                "entity_id": "light.yeelink_cn_126748413_v1_s_2",
                "name": "卫生间灯",
                "room": "bathroom",
                "position": {
                    "top": "45%",
                    "left": "75%"
                },
                "image": "/static/media/卫生间.1fe67f998e889e9d384c.webp"
            },
            {
                "entity_id": "switch.lumi_cn_lumi_158d0003144332_aq1_on_p_2_1",
                "name": "卫生间门口灯",
                "room": "bathroom_entrance",
                "position": {
                    "top": "45%",
                    "left": "61%"
                },
                "image": "/static/media/卫生间门口.17d6d81b5f006b4dc530.webp"
            },
            {
                "entity_id": "light.yeelink_cn_396777994_lamp22_s_2",
                "name": "阳台灯",
                "room": "balcony",
                "position": {
                    "top": "88%",
                    "left": "44%"
                },
                "image": "/static/media/阳台.176d7f4607f22c9d1ba0.webp"
            }
        ]
    },
    "sensors": [
        {
            "id": "LIVING_ROOM",
            "name": "客厅",
            "sensors": {
                "temperature": {
                    "entity_id": "sensor.lumi_cn_lumi_158d00046068f4_v1_temperature_p_2_1",
                    "name": "温度",
                    "icon": "mdiThermometer"
                },
                "humidity": {
                    "entity_id": "sensor.lumi_cn_lumi_158d00046068f4_v1_relative_humidity_p_2_2",
                    "name": "湿度",
                    "icon": "mdiWaterPercent"
                }
            }
        },
        {
            "id": "MASTER_BEDROOM",
            "name": "主卧",
            "sensors": {
                "temperature": {
                    "entity_id": "sensor.lumi_cn_lumi_158d0004086467_v1_temperature_p_2_1",
                    "name": "温度",
                    "icon": "mdiThermometer"
                },
                "humidity": {
                    "entity_id": "sensor.lumi_cn_lumi_158d0004086467_v1_relative_humidity_p_2_2",
                    "name": "湿度",
                    "icon": "mdiWaterPercent"
                }
            }
        },
        {
            "id": "BATHROOM",
            "name": "卫生间",
            "sensors": {
                "temperature": {
                    "entity_id": "sensor.miaomiaoc_cn_blt_3_18l5cihjglg00_t2_temperature_p_2_1",
                    "name": "温度",
                    "icon": "mdiThermometer"
                },
                "humidity": {
                    "entity_id": "sensor.miaomiaoc_cn_blt_3_18l5cihjglg00_t2_relative_humidity_p_2_2",
                    "name": "湿度",
                    "icon": "mdiWaterPercent"
                }
            }
        }
    ],
    "cameras": [
        {
            "entity_id": "camera.ke_ting_mainstream",
            "stream_url": "https://xxx.xxx.xxx.xxx/go2rtc/webrtc.html?src=living_room&media=video+audio",
            "name": "客厅摄像头",
            "room": "living_room"
        },
        {
            "entity_id": "camera.hikvision_ds_2cd3386fwdv3_ls_mainstream",
            "stream_url": "https://xxx.xxx.xxx.xxx/go2rtc/webrtc.html?src=entrance&media=video+audio",
            "name": "门口摄像头",
            "room": "entrance"
        }
    ],
    "climates": [
        {
            "entity_id": "climate.xiaomi_cn_734947863_m9",
            "name": "书房空调",
            "room": "study_room",
            "features": {
                "eco": {
                    "entity_id": "switch.xiaomi_cn_734947863_m9_eco_p_2_7",
                    "name": "节能",
                    "icon": "mdiLeaf",
                    "disableWhen": {
                        "state": "off"
                    }
                },
                "sleep": {
                    "entity_id": "switch.xiaomi_cn_734947863_m9_sleep_mode_p_2_11",
                    "name": "睡眠",
                    "icon": "mdiPowerSleep",
                    "disableWhen": {
                        "state": "off"
                    }
                },
                "heater": {
                    "entity_id": "switch.xiaomi_cn_734947863_m9_heater_p_2_9",
                    "name": "辅热",
                    "icon": "mdiHeatingCoil",
                    "disableWhen": {
                        "state": "off"
                    },
                    "enableWhen": {
                        "mode": "heat"
                    }
                },
                "unStraightBlowing": {
                    "entity_id": "switch.xiaomi_cn_734947863_m9_un_straight_blowing_p_2_15",
                    "name": "防直吹",
                    "icon": "mdiAirFilter",
                    "disableWhen": {
                        "state": "off"
                    },
                    "enableWhen": {
                        "mode": "cool"
                    }
                }
            }
        },
        {
            "entity_id": "climate.master_bedroom_climate",
            "name": "主卧空调",
            "room": "master_bedroom",
            "features": {}
        }
    ],
    "curtains": [
        {
            "entity_id": "cover.lumi_cn_lumi_158d00041bfba5_v1_s_2",
            "name": "客厅窗帘",
            "room": "living_room"
        },
        {
            "entity_id": "cover.lumi_cn_lumi_158d000405d2d8_v1_s_2",
            "name": "主卧窗帘",
            "room": "master_bedroom"
        }
    ],
    "mediaPlayers": [
        {
            "entity_id": "media_player.xiaomi_lx06_d958_play_control",
            "name": "客厅小爱音箱",
            "room": "living_room"
        },
        {
            "entity_id": "media_player.xiaomi_lx06_455c_play_control",
            "name": "主卧小爱音箱",
            "room": "master_bedroom"
        },
        {
            "entity_id": "media_player.xiaomi_x08e_7aca_play_control",
            "name": "书房小爱音箱",
            "room": "study_room"
        }
    ],
    "electricity": {
        "lastUsage": {
            "entity_id": "sensor.electricity_daily_usage",
            "name": "当前用电量"
        },
        "dailyDate": {
            "entity_id": "sensor.electricity_daily_date",
            "name": "日期"
        },
        "chargeBalance": {
            "entity_id": "sensor.electricity_balance",
            "name": "电费余额"
        },
        "yearlyUsage": {
            "entity_id": "sensor.electricity_yearly_usage",
            "name": "年度用电量"
        },
        "yearlyCharge": {
            "entity_id": "sensor.electricity_yearly_charge",
            "name": "年度电费"
        },
        "monthUsage": {
            "entity_id": "sensor.electricity_month_usage",
            "name": "月度用电量"
        },
        "monthCharge": {
            "entity_id": "sensor.electricity_month_charge",
            "name": "月度电费"
        },
        "dailyHistory": {
            "entity_id": "sensor.electricity_daily_history_data",
            "name": "每日用电量"
        }
    },
    "router": {
        "sysName": {
            "entity_id": "sensor.ikuai_sysname",
            "name": "系统名称"
        },
        "sysDesc": {
            "entity_id": "sensor.ikuai_sysdesc",
            "name": "系统描述"
        },
        "cpuTemp": {
            "entity_id": "sensor.ikuai_cpu_temperature",
            "name": "CPU温度"
        },
        "uptime": {
            "entity_id": "sensor.sys_e302_9d_uptime",
            "name": "运行时间"
        },
        "cpuUsage": {
            "entity_id": "sensor.sys_e302_9d_cpu",
            "name": "CPU使用率"
        },
        "memoryUsage": {
            "entity_id": "sensor.sys_e302_9d_memory",
            "name": "内存占用"
        },
        "onlineUsers": {
            "entity_id": "sensor.sys_e302_9d_online_user",
            "name": "在线用户"
        },
        "networkConnections": {
            "entity_id": "sensor.ikuai_network_connections",
            "name": "网络连接数"
        },
        "wanIp": {
            "entity_id": "sensor.sys_e302_9d_wan_ip",
            "name": "Wan IP"
        },
        "wanDownloadSpeed": {
            "entity_id": "sensor.ikuai_wan1_input_speed",
            "name": "WAN 下载"
        },
        "wanUploadSpeed": {
            "entity_id": "sensor.ikuai_wan1_output_speed",
            "name": "WAN 上传"
        }
    },
    "syno_nas": {
        "main": {
            "cpuTemp": {
                "entity_id": "sensor.tianjynas_temperature",
                "name": "CPU温度"
            },
            "cpuUsage": {
                "entity_id": "sensor.tianjynas_cpu_utilization_total",
                "name": "CPU使用率"
            },
            "memoryUsage": {
                "entity_id": "sensor.tianjynas_memory_usage_real",
                "name": "内存占用"
            },
            "uploadSpeed": {
                "entity_id": "sensor.tianjynas_upload_throughput",
                "name": "上传速度"
            },
            "downloadSpeed": {
                "entity_id": "sensor.tianjynas_download_throughput",
                "name": "下载速度"
            }
        },
        "volumes": [
            {
                "name": "存储池1",
                "status": {
                    "entity_id": "sensor.tianjynas_volume_1_status",
                    "name": "状态"
                },
                "usage": {
                    "entity_id": "sensor.tianjynas_volume_1_used_space",
                    "name": "使用空间"
                },
                "total": {
                    "entity_id": "sensor.tianjynas_volume_1_total_size",
                    "name": "总空间"
                },
                "usagePercent": {
                    "entity_id": "sensor.tianjynas_volume_1_volume_used",
                    "name": "使用率"
                },
                "avgTemperature": {
                    "entity_id": "sensor.tianjynas_volume_1_average_disk_temp",
                    "name": "平均温度"
                }
            },
            {
                "name": "存储池2",
                "status": {
                    "entity_id": "sensor.tianjynas_volume_2_status",
                    "name": "状态"
                },
                "usage": {
                    "entity_id": "sensor.tianjynas_volume_2_used_space",
                    "name": "使用空间"
                },
                "total": {
                    "entity_id": "sensor.tianjynas_volume_2_total_size",
                    "name": "总空间"
                },
                "usagePercent": {
                    "entity_id": "sensor.tianjynas_volume_2_volume_used",
                    "name": "使用率"
                },
                "avgTemperature": {
                    "entity_id": "sensor.tianjynas_volume_2_average_disk_temp",
                    "name": "平均温度"
                }
            },
            {
                "name": "存储池3",
                "status": {
                    "entity_id": "sensor.tianjynas_volume_3_status",
                    "name": "状态"
                },
                "usage": {
                    "entity_id": "sensor.tianjynas_volume_3_used_space",
                    "name": "使用空间"
                },
                "total": {
                    "entity_id": "sensor.tianjynas_volume_3_total_size",
                    "name": "总空间"
                },
                "usagePercent": {
                    "entity_id": "sensor.tianjynas_volume_3_volume_used",
                    "name": "使用率"
                },
                "avgTemperature": {
                    "entity_id": "sensor.tianjynas_volume_3_average_disk_temp",
                    "name": "平均温度"
                }
            }
        ],
        "drives": [
            {
                "name": "硬盘1",
                "status": {
                    "entity_id": "sensor.tianjynas_drive_1_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_drive_1_temperature",
                    "name": "温度"
                }
            },
            {
                "name": "硬盘2",
                "status": {
                    "entity_id": "sensor.tianjynas_drive_2_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_drive_2_temperature",
                    "name": "温度"
                }
            },
            {
                "name": "硬盘3",
                "status": {
                    "entity_id": "sensor.tianjynas_drive_3_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_drive_3_temperature",
                    "name": "温度"
                }
            },
            {
                "name": "硬盘4",
                "status": {
                    "entity_id": "sensor.tianjynas_drive_4_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_drive_4_temperature",
                    "name": "温度"
                }
            },
            {
                "name": "硬盘5",
                "status": {
                    "entity_id": "sensor.tianjynas_drive_5_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_drive_5_temperature",
                    "name": "温度"
                }
            },
            {
                "name": "硬盘6",
                "status": {
                    "entity_id": "sensor.tianjynas_drive_6_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_drive_6_temperature",
                    "name": "温度"
                }
            }
        ],
        "m2ssd": [
            {
                "name": "M.2 SSD 1",
                "status": {
                    "entity_id": "sensor.tianjynas_m_2_drive_1_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_m_2_drive_1_temperature",
                    "name": "温度"
                }
            },
            {
                "name": "M.2 SSD 2",
                "status": {
                    "entity_id": "sensor.tianjynas_m_2_drive_2_status",
                    "name": "状态"
                },
                "temperature": {
                    "entity_id": "sensor.tianjynas_m_2_drive_2_temperature",
                    "name": "温度"
                }
            }
        ]
    },
    "scripts": [
        {
            "name": "离家模式",
            "entity_id": "script.home_away_mode",
            "icon": "log-out"
        },
        {
            "name": "回家模式",
            "entity_id": "script.home_back_mode",
            "icon": "log-in"
        },
        {
            "name": "观影模式",
            "entity_id": "script.home_movie_mode",
            "icon": "clapperboard"
        },
        {
            "name": "睡眠模式",
            "entity_id": "script.home_sleep_mode",
            "icon": "moon"
        }
    ],
    "waterpuri": {
        "temperature": {
            "entity_id": "sensor.xiaomi_cn_826991840_800f4_temperature_p_2_4",
            "name": "温度"
        },
        "tds_in": {
            "entity_id": "sensor.xiaomi_cn_826991840_800f4_tds_in_p_4_1",
            "name": "进水TDS"
        },
        "tds_out": {
            "entity_id": "sensor.xiaomi_cn_826991840_800f4_tds_out_p_4_2",
            "name": "出水TDS"
        },
        "pp_filter_life": {
            "entity_id": "sensor.xiaomi_cn_826991840_800f4_filter_life_level_p_3_1",
            "name": "PP棉剩余寿命"
        },
        "ro_filter_life": {
            "entity_id": "sensor.xiaomi_cn_826991840_800f4_filter_life_level_p_8_1",
            "name": "RO反渗透滤芯剩余寿命"
        },
        "status": {
            "entity_id": "sensor.xiaomi_cn_826991840_800f4_status_p_2_3",
            "name": "状态"
        }
    }
}