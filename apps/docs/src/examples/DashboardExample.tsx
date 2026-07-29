import { useState } from 'react';
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Filter,
  FilterItem,
  Link,
  ListItem,
  ListItemIcon,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
  Pagination,
  PaginationItem,
  PaginationLink,
  Separator,
  Stack,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Timeline,
  TimelineItem,
  Toolbar,
} from '@z-ui/react';

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 7 8 2.5 13.5 7V13a.5.5 0 0 1-.5.5H10V9.5H6V13.5H3a.5.5 0 0 1-.5-.5V7z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 12.5V8M7 12.5V4.5M11 12.5V6.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2.5 12.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M11 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 12.5c.2-1.5 1.2-2.5 2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: HomeIcon },
  { id: 'analytics', label: 'Analytics', icon: ChartIcon },
  { id: 'customers', label: 'Customers', icon: UsersIcon },
] as const;

const KPI_CARDS = [
  { title: 'Revenue', value: '$48,290', change: '+12.4%', tone: 'success' as const },
  { title: 'Active users', value: '2,847', change: '+5.1%', tone: 'success' as const },
  { title: 'Churn', value: '2.3%', change: '-0.4%', tone: 'info' as const },
  { title: 'Support tickets', value: '38', change: '+3 open', tone: 'warning' as const },
];

const TABLE_ROWS = [
  { customer: 'Acme Corp', plan: 'Pro', status: 'Active', mrr: '$240' },
  { customer: 'Northwind', plan: 'Enterprise', status: 'Active', mrr: '$640' },
  { customer: 'Globex', plan: 'Starter', status: 'Trial', mrr: '$0' },
  { customer: 'Initech', plan: 'Pro', status: 'Past due', mrr: '$240' },
];

export function DashboardExample() {
  const [activeNav, setActiveNav] = useState<(typeof NAV_ITEMS)[number]['id']>('overview');
  const [range, setRange] = useState('7d');

  return (
    <div className="docs-dashboard">
      <Navbar className="docs-dashboard__navbar">
        <NavbarLogo>
          <strong>Z-UI</strong>
        </NavbarLogo>
        <NavbarContent>
          <NavbarItem>
            <Link href="#" aria-current="page">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">Reports</Link>
          </NavbarItem>
        </NavbarContent>
        <Menu>
          <MenuTrigger asChild>
            <button type="button" className="docs-dashboard__user-trigger" aria-label="Account menu">
              <Avatar size="sm" fallback="AZ" />
            </button>
          </MenuTrigger>
          <MenuContent align="end">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuSeparator />
            <MenuItem>Sign out</MenuItem>
          </MenuContent>
        </Menu>
      </Navbar>

      <div className="docs-dashboard__body">
        <nav className="docs-dashboard__sidebar" aria-label="Dashboard">
          <ul className="docs-dashboard__nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <ListItem
                    as="button"
                    type="button"
                    size="sm"
                    variant="compact"
                    label={item.label}
                    selected={activeNav === item.id}
                    leading={
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                    }
                    onClick={() => setActiveNav(item.id)}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="docs-dashboard__main">
          <header className="docs-dashboard__page-header">
            <div>
              <h2 className="docs-dashboard__page-title">Overview</h2>
              <p className="docs-dashboard__page-summary">Monitor performance across your workspace.</p>
            </div>
            <Toolbar label="Dashboard actions">
              <Filter type="single" value={range} onValueChange={(value) => setRange(value as string)}>
                <FilterItem value="7d">7 days</FilterItem>
                <FilterItem value="30d">30 days</FilterItem>
                <FilterItem value="90d">90 days</FilterItem>
              </Filter>
            </Toolbar>
          </header>

          <div className="docs-dashboard__kpis">
            {KPI_CARDS.map((kpi) => (
              <Card key={kpi.title}>
                <CardHeader>
                  <CardDescription>{kpi.title}</CardDescription>
                  <CardTitle className="docs-dashboard__kpi-value">{kpi.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Status tone={kpi.tone} size="sm" label={kpi.change} />
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <div className="docs-dashboard__split">
                <Card className="docs-dashboard__chart-card">
                  <CardHeader>
                    <CardTitle>Revenue trend</CardTitle>
                    <CardDescription>Chart placeholder — no chart component in the library.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="docs-dashboard__chart-placeholder" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline>
                      <TimelineItem
                        title="New subscription"
                        description="Northwind upgraded to Enterprise"
                        date="2h ago"
                      />
                      <TimelineItem
                        title="Payment received"
                        description="Acme Corp — $240"
                        date="5h ago"
                      />
                      <TimelineItem
                        title="Trial started"
                        description="Globex joined Starter"
                        date="Yesterday"
                      />
                    </Timeline>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>MRR</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TABLE_ROWS.map((row) => (
                        <TableRow key={row.customer}>
                          <TableCell>{row.customer}</TableCell>
                          <TableCell>
                            <Badge size="sm" tone="neutral">
                              {row.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Status
                              size="sm"
                              tone={
                                row.status === 'Active'
                                  ? 'success'
                                  : row.status === 'Trial'
                                    ? 'info'
                                    : 'warning'
                              }
                              label={row.status}
                            />
                          </TableCell>
                          <TableCell>{row.mrr}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Separator />

                  <Pagination className="docs-dashboard__pagination">
                    <PaginationItem>
                      <PaginationLink href="#" disabled>
                        Previous
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" current>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">Next</PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
