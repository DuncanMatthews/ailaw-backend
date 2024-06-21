import React from 'react';
import { format, parseISO } from 'date-fns';

interface CaseDetails {
  date: string;
  title: string;
  type: string;
  mainIssue: string;
  plaintiff: string;
  defendant: string;
  background: string;
  plaintiffArgument: string;
  defendantArgument: string;
  documents: string[];
  witnesses: string[];
  legalFramework: string;
  precedents: string[];
  courtProceedings: string;
}

export function CaseComponent({ props: caseDetails }: { props: CaseDetails[] }) {
  return (
    <div className="-mt-2 flex w-full flex-col gap-2 py-4">
      {caseDetails.map((detail) => (
        <div key={detail.date} className="flex shrink-0 flex-col gap-1 rounded-lg bg-zinc-800 p-4">
          <div className="text-sm text-zinc-400">
            {format(parseISO(detail.date), 'dd LLL, yyyy')}
          </div>
          <div className="text-base font-bold text-zinc-200">
            {detail.title}
          </div>
          <div className="text-zinc-500">
            <strong>Type:</strong> {detail.type}
          </div>
          <div className="text-zinc-500">
            <strong>Main Issue:</strong> {detail.mainIssue}
          </div>
          <div className="text-zinc-500">
            <strong>Plaintiff:</strong> {detail.plaintiff}
          </div>
          <div className="text-zinc-500">
            <strong>Defendant:</strong> {detail.defendant}
          </div>
          <div className="text-zinc-500">
            <strong>Background:</strong> {detail.background}
          </div>
          <div className="text-zinc-500">
            <strong>Plaintiff&apos;s Argument:</strong> {detail.plaintiffArgument}
          </div>
          <div className="text-zinc-500">
            <strong>Defendant&apos;s Argument:</strong> {detail.defendantArgument}
          </div>
          <div className="text-zinc-500">
            <strong>Documents:</strong>
            <ul className="list-disc pl-5">
              {detail.documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
          <div className="text-zinc-500">
            <strong>Witnesses:</strong>
            <ul className="list-disc pl-5">
              {detail.witnesses.map((witness, index) => (
                <li key={index}>{witness}</li>
              ))}
            </ul>
          </div>
          <div className="text-zinc-500">
            <strong>Legal Framework:</strong> {detail.legalFramework}
          </div>
          <div className="text-zinc-500">
            <strong>Precedents:</strong>
            <ul className="list-disc pl-5">
              {detail.precedents.map((precedent, index) => (
                <li key={index}>{precedent}</li>
              ))}
            </ul>
          </div>
          <div className="text-zinc-500">
            <strong>Court Proceedings:</strong> {detail.courtProceedings}
          </div>
        </div>
      ))}
    </div>
  );
}
