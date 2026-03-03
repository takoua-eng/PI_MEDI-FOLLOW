import { Component, DestroyRef, DOCUMENT, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  TemplateIdDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressComponent,
  RowComponent,
  TableDirective
} from '@coreui/angular';
import { DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective } from '@coreui/angular';
import { WidgetStatAComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { getPatients } from '../users/patients/patients-data';
import { getPhysicians } from '../users/physicians/physicians-data';
import { getNurses } from '../users/nurses/nurses-data';
import { getAuditors } from '../users/auditors/auditors-data';
import { getCoordinators } from '../users/coordinators/coordinators-data';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports: [WidgetsDropdownComponent, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, CardFooterComponent, GutterDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective]
})
export class DashboardComponent implements OnInit {

  get patientsCount() { return getPatients().length; }
  get physiciansCount() { return getPhysicians().length; }
  get nursesCount() { return getNurses().length; }
  get othersCount() { return getAuditors().length + getCoordinators().length; }

  // delta percentages for widgets
  public patientsDeltaStr = '';
  public patientsDeltaUp = false;
  public physiciansDeltaStr = '';
  public physiciansDeltaUp = false;
  public nursesDeltaStr = '';
  public nursesDeltaUp = false;
  public othersDeltaStr = '';
  public othersDeltaUp = false;

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/images/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
    this.prepareActivityData();
    this.initCharts();
    this.updateChartOnColorModeChange();
  }

  prepareActivityData(period: string = 'Month') {
    // Initialize main chart to get labels length
    this.#chartsData.initMainChart(period);
    const labels = (this.#chartsData.mainChart.data?.labels || []) as any[];

    // base counts
    const patientsCount = getPatients().length;
    const physiciansCount = getPhysicians().length;
    const nursesCount = getNurses().length;

    // create synthetic activity series based on counts
    const makeSeries = (base: number) => {
      const series: number[] = [];
      for (let i = 0; i < labels.length; i++) {
        // vary around base with some randomness
        const variance = Math.max(1, Math.round(base * 0.3));
        const val = Math.max(0, base + Math.round((Math.random() - 0.5) * 2 * variance));
        series.push(val);
      }
      return series;
    };

    const patientsSeries = makeSeries(patientsCount || 5);
    const physiciansSeries = makeSeries(physiciansCount || 3);
    const nursesSeries = makeSeries(nursesCount || 4);
    const othersSeries = makeSeries((getAuditors().length + getCoordinators().length) || 2);

    // assign to datasets (Current / Previous / BEP) mapping
    if (this.#chartsData.mainChart.data && this.#chartsData.mainChart.data.datasets) {
      const ds = this.#chartsData.mainChart.data.datasets;
      if (ds[0]) ds[0].data = patientsSeries;
      if (ds[1]) ds[1].data = physiciansSeries;
      if (ds[2]) ds[2].data = nursesSeries;
      // compute simple percent delta (last vs previous point)
      const computeDelta = (series: number[]) => {
        if (!series || series.length < 2) return { str: '0%', up: false };
        const a = series[series.length - 1];
        const b = series[series.length - 2] || 1;
        if (b === 0) return { str: '0%', up: a >= b };
        const pct = ((a - b) / Math.abs(b)) * 100;
        const up = pct >= 0;
        return { str: `${Math.abs(pct).toFixed(1)}% ${up ? '↑' : '↓'}`, up };
      };

      const pDelta = computeDelta(patientsSeries);
      this.patientsDeltaStr = pDelta.str;
      this.patientsDeltaUp = pDelta.up;
      const phyDelta = computeDelta(physiciansSeries);
      this.physiciansDeltaStr = phyDelta.str;
      this.physiciansDeltaUp = phyDelta.up;
      const nDelta = computeDelta(nursesSeries);
      this.nursesDeltaStr = nDelta.str;
      this.nursesDeltaUp = nDelta.up;
      const oDelta = computeDelta(othersSeries);
      this.othersDeltaStr = oDelta.str;
      this.othersDeltaUp = oDelta.up;
    }
  }

  initCharts(): void {
    this.mainChartRef()?.stop();
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    // regenerate main chart labels and synthetic activity data
    this.prepareActivityData(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }
}
