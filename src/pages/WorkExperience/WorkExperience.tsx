import { LineNumber } from '@/components/LineNumber';
import { Terminal } from '@/components/Terminal';
import { ROUTES } from '@/Navigation/routeEnum';
import { CalendarDays, MapPin } from 'lucide-react';

export const Experience = () => {
  return (
    <Terminal
      page={ROUTES.EXPERIENCE}
      pwd="experience"
      txt="work_experience"
      eofLineNumber={19}
    >
      {/* File content */}
      <div className="mt-4 space-y-6">
        <div className="border-terminal-accent-border border-l-2 pl-4">
          <div className="flex items-center">
            <LineNumber>3</LineNumber>
            <h2 className="text-terminal-yellow text-lg font-bold">
              # WORK EXPERIENCE
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {/* FirmPilot */}
          <div className="border-terminal-border border-l pl-4">
            <div className="mb-1 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <LineNumber>4</LineNumber>
                <span className="text-terminal-bright-red">●</span>
                <h3 className="text-terminal-green font-bold">FirmPilot</h3>
                <span className="text-border">—</span>
                <span className="text-terminal-blue">Software Engineer</span>
              </div>
              <p className="text-terminal-gray flex flex-row items-center gap-x-2 text-sm">
                <MapPin className="text-terminal-bright-red" size={15} />{' '}
                Nashville, TN (Remote) • <CalendarDays size={15} /> Apr 2025 -
                Present
              </p>
            </div>

            <div className="text-terminal-text space-y-1">
              <div className="flex items-start space-x-2">
                <LineNumber>5</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Lead GraphQL implementation for both API and front-end.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>6</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Built Client website for tracking deliverables, editing and
                  posting blogs to WordPress, social media integration via
                  Ayrshare, and other reporting capabilities.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>7</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Worked on authorization logic to ensure data for clients is
                  only displayable to users with access to them
                </span>
              </div>
            </div>
          </div>

          {/* HCA Healthcare */}
          <div className="border-terminal-border border-l pl-4">
            <div className="mb-1 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <LineNumber>8</LineNumber>
                <span className="text-terminal-bright-red">●</span>
                <h3 className="text-terminal-green font-bold">
                  HCA Healthcare
                </h3>
                <span className="text-border">—</span>
                <span className="text-terminal-blue">
                  Data Integration Engineer II
                </span>
              </div>
              <p className="text-terminal-gray flex flex-row items-center gap-x-2 text-sm">
                <MapPin className="text-terminal-bright-red" size={15} />{' '}
                Nashville, TN • <CalendarDays size={15} />
                Sep 2023 - Apr 2025
              </p>
            </div>

            <div className="text-terminal-text space-y-1">
              <div className="flex items-start space-x-2">
                <LineNumber>9</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Oversaw and maintained 200+ .NET microservices repositories
                  for processing large-scale patient data with high reliability
                  and performance.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>10</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Helped lead the architectural transformation from .NET
                  microservices to Apache NiFi, improving scalability and
                  operational efficiency.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>11</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Developed custom Apache NiFi components to meet complex
                  business requirements and optimize data processing speed.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>12</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Designed and implemented CI/CD pipelines for seamless
                  deployment of code and configurations to Google Cloud Platform
                  (GCP) servers.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>13</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Automated processes to streamline operations, reducing manual
                  effort and enhancing team productivity.
                </span>
              </div>
            </div>
          </div>

          {/* Corolla Ice Delivery */}
          <div className="border-terminal-border border-l pl-4">
            <div className="mb-1 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <LineNumber>14</LineNumber>
                <span className="text-terminal-bright-red">●</span>
                <h3 className="text-terminal-green font-bold">
                  Corolla Ice Delivery
                </h3>
                <span className="text-border">—</span>
                <span className="text-terminal-blue">
                  Lead Developer & Manager
                </span>
              </div>
              <p className="text-terminal-gray flex flex-row gap-x-2 text-sm">
                <MapPin className="text-terminal-bright-red" size={15} />{' '}
                Corolla, NC • <CalendarDays size={15} /> May 2020 - Aug 2022
              </p>
            </div>

            <div className="text-terminal-text space-y-1">
              <div className="flex items-start space-x-2">
                <LineNumber>15</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Designed and developed a full-stack application to manage
                  deliveries and customer information.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>16</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Wrote sorting algorithm to sort deliveries by neighborhood and
                  address to give delivery driver the most optimized route every
                  day.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>17</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Maintained code and went through two version upgrades.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <LineNumber>18</LineNumber>
                <span className="text-terminal-orange">▸</span>
                <span>
                  Led successful advertising campaigns resulting in 700%
                  business growth over 2 years.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Terminal>
  );
};
