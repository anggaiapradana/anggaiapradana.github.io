---
layout: post
title: Konfigurasi InterVLAN Routing Menggunakan MikroTik dengan Bridge VLAN Table
date: 2022-05-29 00:00 +0000
author: angga
categories: [Konfigurasi]
tags: [mikrotik, routing, vlan, subnetting]
---

## Ulasan

InterVLAN Routing menggunakan MikroTik dapat dilakukan dengan beberapa metode, yaitu

1.  Bridge VLAN Table
2.  Switch Chip (hanya untuk interface port ethernet)

Praktikum berikut menggunakan port wlan selain ether, oleh karena itu akan menggunakan metode bridge vlan table.

## Alat dan Bahan

1. Jaringan router internet (instruktur)
   - SSID: internet
   - Security (Password): 1Sampai8
1. 2 buah Komputer, digunakan sebagai remote sekaligus client pada pengujian
1. 2 buah MikroTik Router, digunakan 1 sebagai router dan 1 sebagai switch
   - minimal 4 port eth dan 1 port wlan
   - reset configuration
   - no default configuration
1. 3 buah kabel UTP, digunakan 1 untuk trunk link dan 2 untuk access link
1. MikroTik WinBox

## Langkah Kerja

Pada praktikum kali ini akan terbagi menjadi beberapa tahapan yaitu

1. Persiapan
2. Konfigurasi Router
3. Konfigurasi Switch
4. Konfigurasi Client dan Pengujian
5. Berlatih

### 1. Persiapan

#### Topologi jaringan

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/topo1.jpg){: .normal }

#### Spesifikasi

1. Router

   - Hostname: router-yy (yy diganti nama masing-masing, pada contoh menggunakan angga)
   - eht1: trunk
     - VLAN ID: 10; Name: public; dhcp server,
     - VLAN ID: 20; Name: private; dhcp server,
     - VLAN ID: 30; Name: wireless; dhcp server
   - eht2: -
   - eht3: -
   - eht4: remote
   - wlan1:
     - mode: station bridge,
     - ssid: internet,
     - security (password): 1Sampai8

2. Switch

   - Hostname: switch-yy (yy diganti nama masing-masing, pada contoh menggunakan angga)
   - eht1: trunk (VLAN 10, VLAN 20, VLAN 30)
   - eht2: VLAN 10
   - eht3: VLAN 20
   - eht4: remote
   - wlan1: VLAN 30
     - mode: ap bridge,
     - ssid: vlan30-yy (yy diganti nama masing-masing, pada contoh menggunakan angga),
     - security (password): sandikuxx (xx diganti no presensi masing-masing, pada contoh menggunakan 99)

#### Tabel pengalamatan

| Device    | Interface | VLAN       | IP Addr      | Subnet Mask | Gateway     |
| --------- | --------- | ---------- | ------------ | ----------- | ----------- |
| router-yy | eth1      | 10, 20, 30 | -            | -           | -           |
| router-yy | eth1      | 10         | 10.1xx.10.1  | /24         | -           |
| router-yy | eth1      | 20         | 10.1xx.20.1  | /24         | -           |
| router-yy | eth1      | 30         | 10.1xx.30.1  | /24         | -           |
| router-yy | eth2      | -          | -            | -           | -           |
| router-yy | eth3      | -          | -            | -           | -           |
| router-yy | eth4      | -          | -            | -           | -           |
| router-yy | wlan1     | -          | 172.16.1.1xx | /24         | 172.16.1.1  |
| switch-yy | eth1      | 10, 20, 30 | -            | -           | -           |
| switch-yy | eth2      | 10         | -            | -           | -           |
| switch-yy | eth3      | 20         | -            | -           | -           |
| switch-yy | eth4      | -          | -            | -           | -           |
| switch-yy | wlan1     | 30         | -            | -           | -           |
| client1   | nic       | 10         | dhcp client  | /24         | 10.1xx.10.1 |
| client2   | nic       | 20         | dhcp client  | /24         | 10.1xx.20.1 |
| client3a  | wifi      | 30         | dhcp client  | /24         | 10.1xx.30.1 |
| client3b  | wifi      | 30         | dhcp client  | /24         | 10.1xx.30.1 |

### 2. Konfigurasi Router

#### Langkah ke-01: pasang kabel pada port eth4 untuk remote

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r1.jpg){: .normal }

#### Langkah ke-02: login pada mikrotik

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r2a.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r2b.png){: .normal }

#### Langkah ke-03: ganti hostname

> Menu: System > Identity

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r3.png){: .normal }

#### Langkah ke-04: tambah interface vlan

> Menu: Interfaces > Interface > + > VLAN

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r4.png){: .normal }

#### Langkah ke-05: buat interface vlan sesuai spesifikasi

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r5a.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r5b.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r5c.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r5d.png){: .normal }

#### Langkah ke-06: konfigurasi alamat ip pada vlan (nantinya sebagai gateway)

> Menu: IP > Addresses > Address List > +

![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r6a.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r6b.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r6c.png){: .normal }
![](/assets/img/2022-05-29-konfigurasi-intervlan-routing-menggunakan-mikrotik-bridge-vlan-table/r6d.png){: .normal }

#### Langkah ke-07:

#### Langkah ke-08:

#### Langkah ke-09:

#### Langkah ke-10:

#### Langkah ke-11:

#### Langkah ke-12:

#### Langkah ke-13:

#### Langkah ke-14:

#### Langkah ke-15:

### 3. Konfigurasi Switch

### 4. Konfigurasi Client dan Pengujian

### 5. Berlatih
